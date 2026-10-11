/**
 * Supabase Client & Data Layer
 * Supports both Live Supabase Backend & LocalStorage Offline/Demo fallback
 */

const STORAGE_KEYS = {
  CONFIG: 'trip_tracker_supabase_config',
  EXPENSES: 'trip_tracker_expenses',
  SPLITS: 'trip_tracker_splits',
  SETTLEMENTS: 'trip_tracker_settlements',
};

// Default Sample Data for Pondi Trip with 5 Friends
const SAMPLE_EXPENSES = [
  {
    id: 'exp-1',
    description: 'French Quarter Heritage Villa Stay',
    amount: 12500,
    category: 'stay',
    paid_by: 'Likhith',
    split_type: 'equal',
    date: '2026-10-09',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    splits: [
      { person_name: 'Likhith', share_amount: 2500 },
      { person_name: 'Chiranth', share_amount: 2500 },
      { person_name: 'Benny', share_amount: 2500 },
      { person_name: 'Shamanth', share_amount: 2500 },
      { person_name: 'Karthik', share_amount: 2500 }
    ]
  },
  {
    id: 'exp-2',
    description: 'ECR Highway Toll & Scooter Rentals (5 Scooters)',
    amount: 4500,
    category: 'travel',
    paid_by: 'Chiranth',
    split_type: 'equal',
    date: '2026-10-09',
    created_at: new Date(Date.now() - 86400000 * 2 + 3600000).toISOString(),
    splits: [
      { person_name: 'Likhith', share_amount: 900 },
      { person_name: 'Chiranth', share_amount: 900 },
      { person_name: 'Benny', share_amount: 900 },
      { person_name: 'Shamanth', share_amount: 900 },
      { person_name: 'Karthik', share_amount: 900 }
    ]
  },
  {
    id: 'exp-3',
    description: 'Promenade Beach French Cafe & Seafood',
    amount: 5200,
    category: 'food',
    paid_by: 'Benny',
    split_type: 'equal',
    date: '2026-10-10',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    splits: [
      { person_name: 'Likhith', share_amount: 1040 },
      { person_name: 'Chiranth', share_amount: 1040 },
      { person_name: 'Benny', share_amount: 1040 },
      { person_name: 'Shamanth', share_amount: 1040 },
      { person_name: 'Karthik', share_amount: 1040 }
    ]
  },
  {
    id: 'exp-4',
    description: 'Paradise Beach Boat Ride & Surfing (4 persons)',
    amount: 6000,
    category: 'activities',
    paid_by: 'Shamanth',
    split_type: 'split',
    date: '2026-10-10',
    created_at: new Date(Date.now() - 86400000 + 7200000).toISOString(),
    splits: [
      { person_name: 'Likhith', share_amount: 1500 },
      { person_name: 'Chiranth', share_amount: 1500 },
      { person_name: 'Benny', share_amount: 1500 },
      { person_name: 'Shamanth', share_amount: 1500 }
    ]
  },
  {
    id: 'exp-5',
    description: 'Auroville Handcrafted Spices & Bakery for Benny',
    amount: 850,
    category: 'shopping',
    paid_by: 'Karthik',
    split_type: 'individual',
    date: '2026-10-11',
    created_at: new Date(Date.now() - 14400000).toISOString(),
    splits: [
      { person_name: 'Benny', share_amount: 850 }
    ]
  }
];
// ============================================================
// 🔑 SUPABASE CONFIGURATION: Paste your Supabase details here:
// ============================================================
const SUPABASE_PROJECT_URL = 'https://akutsgressuehsmtvbxb.supabase.co'; // e.g. 'https://xyzcompany.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_RS9RzmDE8qYusihq4BQoZw_v53-OXZL';    // e.g. 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
// ============================================================

class SupabaseService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.config = this.loadConfig();
    this.initClient();
  }

  loadConfig() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.url && parsed.anonKey) return parsed;
      }
      return { 
        url: SUPABASE_PROJECT_URL, 
        anonKey: SUPABASE_ANON_KEY 
      };
    } catch (e) {
      return { 
        url: SUPABASE_PROJECT_URL, 
        anonKey: SUPABASE_ANON_KEY 
      };
    }
  }

  saveConfig(url, anonKey) {
    this.config = { url: url.trim(), anonKey: anonKey.trim() };
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(this.config));
    return this.initClient();
  }

  async initClient() {
    if (this.config.url && this.config.anonKey && window.supabase) {
      try {
        this.client = window.supabase.createClient(this.config.url, this.config.anonKey);
        // Test connection
        const { error } = await this.client.from('expenses').select('id').limit(1);
        if (!error) {
          this.isConnected = true;
          return { success: true, mode: 'supabase' };
        } else {
          console.warn('Supabase test query warning:', error.message);
          this.isConnected = false;
          return { success: false, error: error.message };
        }
      } catch (err) {
        console.error('Supabase init error:', err);
        this.isConnected = false;
        return { success: false, error: err.message };
      }
    }
    this.isConnected = false;
    return { success: false, mode: 'local' };
  }

  // Get all expenses with splits
  async getExpenses() {
    if (this.isConnected && this.client) {
      try {
        const { data: expenses, error: expError } = await this.client
          .from('expenses')
          .select('*')
          .order('created_at', { ascending: false });

        if (expError) throw expError;

        const { data: splits, error: splitError } = await this.client
          .from('expense_splits')
          .select('*');

        if (splitError) throw splitError;

        // Group splits by expense_id
        const splitsMap = {};
        (splits || []).forEach(s => {
          if (!splitsMap[s.expense_id]) splitsMap[s.expense_id] = [];
          splitsMap[s.expense_id].push(s);
        });

        return (expenses || []).map(exp => ({
          ...exp,
          splits: splitsMap[exp.id] || []
        }));
      } catch (err) {
        console.warn('Failed to fetch from Supabase, falling back to local:', err);
      }
    }

    // LocalStorage Fallback
    const local = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    if (!local) {
      // Seed with sample data on first launch
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(SAMPLE_EXPENSES));
      return SAMPLE_EXPENSES;
    }
    try {
      return JSON.parse(local);
    } catch (e) {
      return SAMPLE_EXPENSES;
    }
  }

  // Add Expense
  async addExpense(expenseData) {
    const newId = 'exp-' + Date.now();
    const newExpense = {
      id: newId,
      description: expenseData.description,
      amount: parseFloat(expenseData.amount),
      category: expenseData.category,
      paid_by: expenseData.paid_by,
      split_type: expenseData.split_type,
      date: expenseData.date || new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
      splits: expenseData.splits.map(s => ({
        ...s,
        expense_id: newId,
        id: 'split-' + Math.random().toString(36).substr(2, 9)
      }))
    };

    if (this.isConnected && this.client) {
      try {
        const { data: expRow, error: expErr } = await this.client
          .from('expenses')
          .insert([{
            description: newExpense.description,
            amount: newExpense.amount,
            category: newExpense.category,
            paid_by: newExpense.paid_by,
            split_type: newExpense.split_type,
            date: newExpense.date
          }])
          .select()
          .single();

        if (expErr) throw expErr;

        const splitRows = expenseData.splits.map(s => ({
          expense_id: expRow.id,
          person_name: s.person_name,
          share_amount: s.share_amount
        }));

        const { error: splitErr } = await this.client
          .from('expense_splits')
          .insert(splitRows);

        if (splitErr) throw splitErr;

        newExpense.id = expRow.id;
      } catch (err) {
        console.error('Supabase insert failed, saving locally:', err);
      }
    }

    // Always update local cache
    const current = await this.getLocalExpenses();
    current.unshift(newExpense);
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(current));

    return newExpense;
  }

  // Delete Expense
  async deleteExpense(id) {
    if (this.isConnected && this.client) {
      try {
        await this.client.from('expenses').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete failed:', err);
      }
    }

    const current = await this.getLocalExpenses();
    const filtered = current.filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(filtered));
    return true;
  }

  // Settlements
  async getLocalSettlements() {
    try {
      const local = localStorage.getItem(STORAGE_KEYS.SETTLEMENTS);
      return local ? JSON.parse(local) : [];
    } catch (e) {
      return [];
    }
  }

  async getSettlements() {
    if (this.isConnected && this.client) {
      try {
        const { data, error } = await this.client
          .from('settlements')
          .select('*')
          .order('created_at', { ascending: false });
        if (!error && data) return data;
      } catch (e) {
        console.warn('Supabase settlements fetch failed:', e);
      }
    }
    return this.getLocalSettlements();
  }

  async addSettlement(settlement) {
    const item = {
      id: 'set-' + Date.now(),
      from_person: settlement.from_person,
      to_person: settlement.to_person,
      amount: parseFloat(settlement.amount),
      notes: settlement.notes || 'Settlement payment',
      created_at: new Date().toISOString()
    };

    if (this.isConnected && this.client) {
      try {
        const { data, error } = await this.client
          .from('settlements')
          .insert([{
            from_person: item.from_person,
            to_person: item.to_person,
            amount: item.amount,
            notes: item.notes
          }])
          .select()
          .single();
        if (error) throw error;
        if (data && data.id) item.id = data.id;
      } catch (e) {
        console.warn('Supabase settlement save failed:', e);
      }
    }

    const current = await this.getLocalSettlements();
    current.unshift(item);
    localStorage.setItem(STORAGE_KEYS.SETTLEMENTS, JSON.stringify(current));
    return item;
  }

  async deleteSettlement(id) {
    if (this.isConnected && this.client) {
      try {
        await this.client.from('settlements').delete().eq('id', id);
      } catch (e) {
        console.warn('Supabase settlement delete failed:', e);
      }
    }
    const current = await this.getLocalSettlements();
    const filtered = current.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.SETTLEMENTS, JSON.stringify(filtered));
    return true;
  }

  async getLocalExpenses() {
    const local = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return local ? JSON.parse(local) : SAMPLE_EXPENSES;
  }

  resetToDemo() {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(SAMPLE_EXPENSES));
    localStorage.removeItem(STORAGE_KEYS.SETTLEMENTS);
  }

  clearAllData() {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify([]));
    localStorage.removeItem(STORAGE_KEYS.SETTLEMENTS);
  }
}

window.supabaseService = new SupabaseService();
