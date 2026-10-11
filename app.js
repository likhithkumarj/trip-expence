/**
 * SquadSplit - Mobile-First Trip Expense Tracker
 * Friends: Likhith, Chiranth, Benny, Shamanth, Karthik
 */

// 1. Group Members Configuration
const GROUP_MEMBERS = [
  { id: 'likhith', name: 'Likhith', initial: 'L', gradient: 'linear-gradient(135deg, #6366f1, #06b6d4)' },
  { id: 'chiranth', name: 'Chiranth', initial: 'C', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
  { id: 'benny', name: 'Benny', initial: 'B', gradient: 'linear-gradient(135deg, #f59e0b, #d97706)' },
  { id: 'shamanth', name: 'Shamanth', initial: 'S', gradient: 'linear-gradient(135deg, #ec4899, #be185d)' },
  { id: 'karthik', name: 'Karthik', initial: 'K', gradient: 'linear-gradient(135deg, #8b5cf6, #6d28d9)' }
];

// Categories definition
const CATEGORIES = {
  food: { name: 'Food & Dining', icon: '🍔', color: '#f59e0b' },
  travel: { name: 'Travel & Fuel', icon: '🚗', color: '#06b6d4' },
  stay: { name: 'Stay & Hotel', icon: '🏨', color: '#6366f1' },
  activities: { name: 'Activities & Fun', icon: '🏄', color: '#10b981' },
  shopping: { name: 'Shopping & Snacks', icon: '🛒', color: '#ec4899' },
  misc: { name: 'Misc & Others', icon: '📦', color: '#8b5cf6' }
};

// State
let appState = {
  expenses: [],
  settlements: [],
  activeTab: 'add-view', // 'add-view', 'see-view', 'dashboard-view'
  activeSubTab: 'everyone', // 'everyone', 'individual'
  selectedPayer: 'Likhith',
  splitMode: 'split', // 'split' or 'individual'
  selectedSplitMembers: ['Likhith', 'Chiranth', 'Benny', 'Shamanth', 'Karthik'],
  selectedIndividualTarget: 'Chiranth',
  activeDashboardMember: null, // Current member being viewed in detail dashboard
  timelineFilter: 'all', // 'all', 'paid', 'shared'
  searchTerm: '',
  categoryFilter: 'all'
};

// DOM Elements
const elements = {
  // Tabs
  tabAddExpense: document.getElementById('tabAddExpense'),
  tabSeeExpense: document.getElementById('tabSeeExpense'),
  addView: document.getElementById('addView'),
  seeView: document.getElementById('seeView'),
  individualDashboardView: document.getElementById('individualDashboardView'),

  // Subtabs in See Expense
  subTabEveryone: document.getElementById('subTabEveryone'),
  subTabIndividual: document.getElementById('subTabIndividual'),
  everyoneContent: document.getElementById('everyoneContent'),
  individualContent: document.getElementById('individualContent'),

  // Form
  expenseForm: document.getElementById('expenseForm'),
  expenseAmount: document.getElementById('expenseAmount'),
  expenseDescription: document.getElementById('expenseDescription'),
  expenseCategory: document.getElementById('expenseCategory'),
  payerSelector: document.getElementById('payerSelector'),
  btnModeSplit: document.getElementById('btnModeSplit'),
  btnModeIndividual: document.getElementById('btnModeIndividual'),
  splitExpenseDetails: document.getElementById('splitExpenseDetails'),
  individualExpenseDetails: document.getElementById('individualExpenseDetails'),
  splitMembersGrid: document.getElementById('splitMembersGrid'),
  selectAllMembersBtn: document.getElementById('selectAllMembersBtn'),
  splitSummaryBanner: document.getElementById('splitSummaryBanner'),
  individualTargetGrid: document.getElementById('individualTargetGrid'),
  expenseDate: document.getElementById('expenseDate'),
  expenseNotes: document.getElementById('expenseNotes'),

  // Everyone's View
  tripTotalAmount: document.getElementById('tripTotalAmount'),
  tripAvgPerPerson: document.getElementById('tripAvgPerPerson'),
  totalExpenseCount: document.getElementById('totalExpenseCount'),
  settlementCount: document.getElementById('settlementCount'),
  categoryBarsList: document.getElementById('categoryBarsList'),
  balancesSummaryList: document.getElementById('balancesSummaryList'),
  settlementPlanList: document.getElementById('settlementPlanList'),
  allTransactionsList: document.getElementById('allTransactionsList'),
  expensesCountBadge: document.getElementById('expensesCountBadge'),
  historyCountLabel: document.getElementById('historyCountLabel'),
  expenseSearchInput: document.getElementById('expenseSearchInput'),
  expenseCategoryFilter: document.getElementById('expenseCategoryFilter'),

  // Individual Roster View
  friendsRosterGrid: document.getElementById('friendsRosterGrid'),

  // Mobile Individual Dashboard
  btnBackToIndividualList: document.getElementById('btnBackToIndividualList'),
  btnQuickSettleDashboard: document.getElementById('btnQuickSettleDashboard'),
  dashAvatar: document.getElementById('dashAvatar'),
  dashStatusDot: document.getElementById('dashStatusDot'),
  dashPersonName: document.getElementById('dashPersonName'),
  dashStatusBadge: document.getElementById('dashStatusBadge'),
  dashSectionPersonName: document.getElementById('dashSectionPersonName'),
  dashTotalPaid: document.getElementById('dashTotalPaid'),
  dashTotalShare: document.getElementById('dashTotalShare'),
  dashNetBalance: document.getElementById('dashNetBalance'),
  dashReceivablesList: document.getElementById('dashReceivablesList'),
  dashPayablesList: document.getElementById('dashPayablesList'),
  dashCategoryBars: document.getElementById('dashCategoryBars'),
  dashPersonTransactionsList: document.getElementById('dashPersonTransactionsList'),
  timelineFilterAll: document.getElementById('timelineFilterAll'),
  timelineFilterPaid: document.getElementById('timelineFilterPaid'),
  timelineFilterShared: document.getElementById('timelineFilterShared'),

  // Settle Modal
  settleModal: document.getElementById('settleModal'),
  closeSettleModal: document.getElementById('closeSettleModal'),
  cancelSettleBtn: document.getElementById('cancelSettleBtn'),
  settleForm: document.getElementById('settleForm'),
  settleFromPerson: document.getElementById('settleFromPerson'),
  settleToPerson: document.getElementById('settleToPerson'),
  settleAmount: document.getElementById('settleAmount'),
  settleNote: document.getElementById('settleNote'),

  // Supabase Modal & Status
  supabaseStatusBtn: document.getElementById('supabaseStatusBtn'),
  statusLabel: document.getElementById('statusLabel'),
  tripMenuBtn: document.getElementById('tripMenuBtn'),
  supabaseModal: document.getElementById('supabaseModal'),
  closeSupabaseModal: document.getElementById('closeSupabaseModal'),
  supabaseConfigForm: document.getElementById('supabaseConfigForm'),
  supabaseUrl: document.getElementById('supabaseUrl'),
  supabaseAnonKey: document.getElementById('supabaseAnonKey'),
  modalConnectionStatus: document.getElementById('modalConnectionStatus'),
  modalStatusDetail: document.getElementById('modalStatusDetail'),
  copySqlBtn: document.getElementById('copySqlBtn'),
  btnResetDemoData: document.getElementById('btnResetDemoData'),
  btnClearAllData: document.getElementById('btnClearAllData'),
  toastContainer: document.getElementById('toastContainer')
};

// Format currency
function formatCurrency(val) {
  const num = Math.round((parseFloat(val) || 0) * 100) / 100;
  return '₹' + num.toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 0 });
}

// Show Toast
function showToast(message, type = 'normal') {
  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : type === 'error' ? 'toast-error' : ''}`;
  toast.innerHTML = `<span>${message}</span>`;
  elements.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}

// Initialize Application
async function initApp() {
  // Set default date to today
  elements.expenseDate.value = new Date().toISOString().split('T')[0];

  // Render Friend Pickers in Form
  renderFormPayerPills();
  renderFormSplitGrid();
  renderFormIndividualTargetGrid();
  populateSettleDropdowns();

  // Load Data
  await refreshData();

  // Setup Event Listeners
  setupEventListeners();

  // Check Supabase status
  updateConnectionBadge();
}

// Populate Settle Modal Dropdowns
function populateSettleDropdowns() {
  elements.settleFromPerson.innerHTML = '';
  elements.settleToPerson.innerHTML = '';

  GROUP_MEMBERS.forEach(m => {
    const optFrom = document.createElement('option');
    optFrom.value = m.name;
    optFrom.textContent = m.name;
    elements.settleFromPerson.appendChild(optFrom);

    const optTo = document.createElement('option');
    optTo.value = m.name;
    optTo.textContent = m.name;
    elements.settleToPerson.appendChild(optTo);
  });

  // Default to different members
  if (elements.settleToPerson.children.length > 1) {
    elements.settleToPerson.selectedIndex = 1;
  }
}

// Render Payer Pills in Add Expense Form
function renderFormPayerPills() {
  elements.payerSelector.innerHTML = '';
  GROUP_MEMBERS.forEach(member => {
    const pill = document.createElement('div');
    pill.className = `payer-pill ${appState.selectedPayer === member.name ? 'active' : ''}`;
    pill.dataset.name = member.name;
    pill.innerHTML = `
      <div class="avatar-circle" style="background: ${member.gradient}">${member.initial}</div>
      <span class="name">${member.name}</span>
    `;
    pill.addEventListener('click', () => {
      appState.selectedPayer = member.name;
      document.querySelectorAll('.payer-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      updateSplitPreview();
    });
    elements.payerSelector.appendChild(pill);
  });
}

// Render Checkboxes for Split Expense
function renderFormSplitGrid() {
  elements.splitMembersGrid.innerHTML = '';
  GROUP_MEMBERS.forEach(member => {
    const isSelected = appState.selectedSplitMembers.includes(member.name);
    const chip = document.createElement('div');
    chip.className = `member-chip ${isSelected ? 'selected' : ''}`;
    chip.dataset.name = member.name;
    chip.innerHTML = `
      <div class="chip-avatar" style="background: ${member.gradient}">${member.initial}</div>
      <span>${member.name}</span>
    `;
    chip.addEventListener('click', () => {
      const idx = appState.selectedSplitMembers.indexOf(member.name);
      if (idx > -1) {
        // Don't uncheck if it's the last one
        if (appState.selectedSplitMembers.length > 1) {
          appState.selectedSplitMembers.splice(idx, 1);
          chip.classList.remove('selected');
        } else {
          showToast('At least one friend must be included in split', 'error');
        }
      } else {
        appState.selectedSplitMembers.push(member.name);
        chip.classList.add('selected');
      }
      updateSplitPreview();
    });
    elements.splitMembersGrid.appendChild(chip);
  });
}

// Render Individual Target Grid
function renderFormIndividualTargetGrid() {
  elements.individualTargetGrid.innerHTML = '';
  GROUP_MEMBERS.forEach(member => {
    const isTarget = appState.selectedIndividualTarget === member.name;
    const pill = document.createElement('div');
    pill.className = `individual-target-pill ${isTarget ? 'active' : ''}`;
    pill.dataset.name = member.name;
    pill.innerHTML = `
      <div class="chip-avatar" style="background: ${member.gradient}">${member.initial}</div>
      <span>${member.name}</span>
    `;
    pill.addEventListener('click', () => {
      appState.selectedIndividualTarget = member.name;
      document.querySelectorAll('.individual-target-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      updateSplitPreview();
    });
    elements.individualTargetGrid.appendChild(pill);
  });
}

// Update Split Live Preview
function updateSplitPreview() {
  const amt = parseFloat(elements.expenseAmount.value) || 0;
  if (appState.splitMode === 'split') {
    const count = appState.selectedSplitMembers.length;
    if (count > 0 && amt > 0) {
      const perPerson = amt / count;
      elements.splitSummaryBanner.innerHTML = `
        <strong>${formatCurrency(perPerson)}</strong> / person (${count} friends)
      `;
    } else {
      elements.splitSummaryBanner.innerHTML = `Select friends & enter amount to preview`;
    }
  } else {
    elements.splitSummaryBanner.innerHTML = `
      <strong>${formatCurrency(amt)}</strong> assigned solely to <strong>${appState.selectedIndividualTarget}</strong>
    `;
  }
}

// Data Refresh
async function refreshData() {
  try {
    appState.expenses = await window.supabaseService.getExpenses();
    appState.settlements = await window.supabaseService.getSettlements();
    renderAllViews();
  } catch (err) {
    console.error('Failed to refresh data:', err);
  }
}

// Render All Views
function renderAllViews() {
  elements.expensesCountBadge.textContent = appState.expenses.length;
  elements.totalExpenseCount.textContent = appState.expenses.length;
  elements.settlementCount.textContent = appState.settlements.length;
  elements.historyCountLabel.textContent = `${appState.expenses.length} items`;

  renderTripOverview();
  renderCategoryBreakdown();
  renderNetBalancesAndSettlements();
  renderTransactionsList();
  renderFriendsRoster();

  // If currently inside an individual dashboard, update it too
  if (appState.activeDashboardMember) {
    renderIndividualDashboard(appState.activeDashboardMember);
  }

  // Refresh Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

// ----------------------------------------------------
// FINANCIAL & SETTLEMENT CALCULATION ENGINE
// ----------------------------------------------------
function calculateFinancials() {
  // Initialize balance dictionary
  const balances = {};
  const paidAmounts = {};
  const shareAmounts = {};
  const categorySpending = {};

  GROUP_MEMBERS.forEach(m => {
    balances[m.name] = 0;
    paidAmounts[m.name] = 0;
    shareAmounts[m.name] = 0;
  });

  Object.keys(CATEGORIES).forEach(c => {
    categorySpending[c] = 0;
  });

  let totalTripSpend = 0;

  // Process Expenses
  appState.expenses.forEach(exp => {
    const amt = parseFloat(exp.amount) || 0;
    totalTripSpend += amt;

    // Track category spend
    const cat = exp.category || 'misc';
    categorySpending[cat] = (categorySpending[cat] || 0) + amt;

    // Track payer
    if (paidAmounts[exp.paid_by] !== undefined) {
      paidAmounts[exp.paid_by] += amt;
      balances[exp.paid_by] += amt;
    }

    // Process splits
    if (exp.splits && exp.splits.length > 0) {
      exp.splits.forEach(s => {
        const share = parseFloat(s.share_amount) || 0;
        if (shareAmounts[s.person_name] !== undefined) {
          shareAmounts[s.person_name] += share;
          balances[s.person_name] -= share;
        }
      });
    } else {
      // Fallback: Equal split among all 5
      const perPerson = amt / GROUP_MEMBERS.length;
      GROUP_MEMBERS.forEach(m => {
        shareAmounts[m.name] += perPerson;
        balances[m.name] -= perPerson;
      });
    }
  });

  // Process Settlements
  appState.settlements.forEach(st => {
    const sAmt = parseFloat(st.amount) || 0;
    // FromPerson paid ToPerson => FromPerson's balance increases (+), ToPerson's decreases (-)
    if (balances[st.from_person] !== undefined) {
      balances[st.from_person] += sAmt;
    }
    if (balances[st.to_person] !== undefined) {
      balances[st.to_person] -= sAmt;
    }
  });

  return {
    totalTripSpend,
    avgPerPerson: totalTripSpend / GROUP_MEMBERS.length,
    paidAmounts,
    shareAmounts,
    balances,
    categorySpending
  };
}

// Greedy Debt Minimization Algorithm
function calculateOptimalSettlements(balances) {
  // debtors: owe money (negative balance)
  // creditors: should receive money (positive balance)
  const debtors = [];
  const creditors = [];

  Object.keys(balances).forEach(person => {
    const bal = Math.round(balances[person] * 100) / 100;
    if (bal < -0.5) {
      debtors.push({ person, amount: -bal });
    } else if (bal > 0.5) {
      creditors.push({ person, amount: bal });
    }
  });

  debtors.sort((a, b) => b.amount - a.amount);
  creditors.sort((a, b) => b.amount - a.amount);

  const settlements = [];

  let i = 0; // debtors
  let j = 0; // creditors

  while (i < debtors.length && j < creditors.length) {
    const debtor = debtors[i];
    const creditor = creditors[j];
    const settleAmt = Math.min(debtor.amount, creditor.amount);

    if (settleAmt > 0.5) {
      settlements.push({
        from: debtor.person,
        to: creditor.person,
        amount: Math.round(settleAmt * 100) / 100
      });
    }

    debtor.amount -= settleAmt;
    creditor.amount -= settleAmt;

    if (debtor.amount < 0.5) i++;
    if (creditor.amount < 0.5) j++;
  }

  return settlements;
}

// ----------------------------------------------------
// RENDER VIEWS
// ----------------------------------------------------

// Render Trip Overview Cards
function renderTripOverview() {
  const fin = calculateFinancials();
  elements.tripTotalAmount.textContent = formatCurrency(fin.totalTripSpend);
  elements.tripAvgPerPerson.textContent = `${formatCurrency(fin.avgPerPerson)} / person`;
}

// Render Category Breakdown Bars
function renderCategoryBreakdown() {
  const fin = calculateFinancials();
  elements.categoryBarsList.innerHTML = '';

  const total = fin.totalTripSpend || 1;

  Object.keys(CATEGORIES).forEach(catKey => {
    const cat = CATEGORIES[catKey];
    const amt = fin.categorySpending[catKey] || 0;
    const pct = Math.round((amt / total) * 100);

    if (amt > 0 || fin.totalTripSpend === 0) {
      const item = document.createElement('div');
      item.className = 'category-bar-item';
      item.innerHTML = `
        <div class="cat-bar-header">
          <span class="cat-bar-name">
            <span>${cat.icon}</span>
            <span>${cat.name}</span>
          </span>
          <span class="cat-bar-amt">${formatCurrency(amt)} (${pct}%)</span>
        </div>
        <div class="cat-progress-bg">
          <div class="cat-progress-fill" style="width: ${pct}%; background: ${cat.color};"></div>
        </div>
      `;
      elements.categoryBarsList.appendChild(item);
    }
  });

  if (fin.totalTripSpend === 0) {
    elements.categoryBarsList.innerHTML = `
      <p style="font-size: 0.8rem; color: #64748b; text-align: center; padding: 10px;">
        No expenses recorded yet. Add your first trip bill!
      </p>
    `;
  }
}

// Render Net Balances & Settlements in Everyone's Tab
function renderNetBalancesAndSettlements() {
  const fin = calculateFinancials();
  elements.balancesSummaryList.innerHTML = '';

  // Render 5 Friends Balance Rows
  GROUP_MEMBERS.forEach(member => {
    const bal = Math.round((fin.balances[member.name] || 0) * 100) / 100;
    const row = document.createElement('div');
    row.className = 'balance-item-row';
    
    let badgeClass = 'settled';
    let badgeText = 'Settled';
    if (bal > 0.5) {
      badgeClass = 'positive';
      badgeText = `+${formatCurrency(bal)} (Gets Back)`;
    } else if (bal < -0.5) {
      badgeClass = 'negative';
      badgeText = `-${formatCurrency(Math.abs(bal))} (Owes)`;
    }

    row.innerHTML = `
      <div class="balance-person-left">
        <div class="balance-avatar" style="background: ${member.gradient}">${member.initial}</div>
        <span class="balance-person-name">${member.name}</span>
      </div>
      <div class="balance-badge ${badgeClass}">${badgeText}</div>
    `;

    // Click row to view this friend's dashboard
    row.addEventListener('click', () => {
      openIndividualDashboard(member.name);
    });

    elements.balancesSummaryList.appendChild(row);
  });

  // Render Optimal Settlement Transfers
  const settlements = calculateOptimalSettlements(fin.balances);
  elements.settlementPlanList.innerHTML = '';

  if (settlements.length === 0) {
    elements.settlementPlanList.innerHTML = `
      <div style="text-align: center; padding: 14px; font-size: 0.82rem; color: #10b981; font-weight: 600;">
        🎉 All expenses are fully squared up! Nobody owes anything.
      </div>
    `;
  } else {
    settlements.forEach(st => {
      const card = document.createElement('div');
      card.className = 'settlement-card';
      card.innerHTML = `
        <div class="settlement-flow">
          <span class="payer-name">${st.from}</span>
          <span class="settle-arrow">➔ pays ➔</span>
          <span class="receiver-name">${st.to}</span>
        </div>
        <div class="settlement-right">
          <span class="settle-amount">${formatCurrency(st.amount)}</span>
          <button class="btn-settle-mini" data-from="${st.from}" data-to="${st.to}" data-amt="${st.amount}">
            Settle
          </button>
        </div>
      `;

      card.querySelector('.btn-settle-mini').addEventListener('click', (e) => {
        e.stopPropagation();
        openSettleModal(st.from, st.to, st.amount);
      });

      elements.settlementPlanList.appendChild(card);
    });
  }
}

// Render Transactions Feed
function renderTransactionsList() {
  elements.allTransactionsList.innerHTML = '';

  let filtered = [...appState.expenses];

  // Search filter
  if (appState.searchTerm) {
    const q = appState.searchTerm.toLowerCase();
    filtered = filtered.filter(exp => 
      exp.description.toLowerCase().includes(q) ||
      exp.paid_by.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (appState.categoryFilter && appState.categoryFilter !== 'all') {
    filtered = filtered.filter(exp => exp.category === appState.categoryFilter);
  }

  if (filtered.length === 0) {
    elements.allTransactionsList.innerHTML = `
      <p style="font-size: 0.8rem; color: #64748b; text-align: center; padding: 20px;">
        No matching expenses found.
      </p>
    `;
    return;
  }

  filtered.forEach(exp => {
    const cat = CATEGORIES[exp.category] || CATEGORIES.misc;
    const splitCount = exp.splits ? exp.splits.length : 5;
    const splitLabel = exp.split_type === 'individual' 
      ? `1-on-1 for ${exp.splits && exp.splits[0] ? exp.splits[0].person_name : 'friend'}`
      : `Split between ${splitCount}`;

    const card = document.createElement('div');
    card.className = 'transaction-card';
    card.innerHTML = `
      <div class="tx-left">
        <div class="tx-cat-icon">${cat.icon}</div>
        <div class="tx-info">
          <span class="tx-title">${escapeHtml(exp.description)}</span>
          <span class="tx-subtitle">
            <span class="tx-paidby-tag">${exp.paid_by}</span> paid • ${exp.date || 'Today'}
          </span>
        </div>
      </div>
      <div class="tx-right">
        <span class="tx-amount">${formatCurrency(exp.amount)}</span>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="tx-split-tag">${splitLabel}</span>
          <button class="tx-delete-btn" title="Delete expense" data-id="${exp.id}">
            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
          </button>
        </div>
      </div>
    `;

    card.querySelector('.tx-delete-btn').addEventListener('click', async (e) => {
      e.stopPropagation();
      if (confirm(`Delete "${exp.description}"?`)) {
        await window.supabaseService.deleteExpense(exp.id);
        showToast('Expense removed', 'normal');
        await refreshData();
      }
    });

    elements.allTransactionsList.appendChild(card);
  });
}

// Render Friends Roster Cards (Sub-Tab B: Individual Expense)
function renderFriendsRoster() {
  const fin = calculateFinancials();
  elements.friendsRosterGrid.innerHTML = '';

  GROUP_MEMBERS.forEach(member => {
    const paid = fin.paidAmounts[member.name] || 0;
    const share = fin.shareAmounts[member.name] || 0;
    const bal = Math.round((fin.balances[member.name] || 0) * 100) / 100;

    let badgeClass = 'settled';
    let badgeText = 'Settled';
    if (bal > 0.5) {
      badgeClass = 'positive';
      badgeText = `+${formatCurrency(bal)}`;
    } else if (bal < -0.5) {
      badgeClass = 'negative';
      badgeText = `-${formatCurrency(Math.abs(bal))}`;
    }

    const card = document.createElement('div');
    card.className = 'friend-card';
    card.innerHTML = `
      <div class="friend-card-left">
        <div class="friend-card-avatar" style="background: ${member.gradient}">
          ${member.initial}
        </div>
        <div class="friend-card-details">
          <h4 class="friend-card-name">${member.name}</h4>
          <span class="friend-card-substats">
            Paid: ${formatCurrency(paid)} • Share: ${formatCurrency(share)}
          </span>
        </div>
      </div>
      <div class="friend-card-right">
        <div class="friend-net-badge balance-badge ${badgeClass}">${badgeText}</div>
        <span class="friend-view-arrow">View Dashboard ➔</span>
      </div>
    `;

    card.addEventListener('click', () => {
      openIndividualDashboard(member.name);
    });

    elements.friendsRosterGrid.appendChild(card);
  });
}

// ----------------------------------------------------
// MOBILE-FIRST DEDICATED INDIVIDUAL DASHBOARD
// ----------------------------------------------------
function openIndividualDashboard(memberName) {
  appState.activeDashboardMember = memberName;
  appState.activeTab = 'dashboard-view';

  elements.addView.classList.add('hidden');
  elements.seeView.classList.add('hidden');
  elements.individualDashboardView.classList.remove('hidden');

  renderIndividualDashboard(memberName);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderIndividualDashboard(memberName) {
  const member = GROUP_MEMBERS.find(m => m.name === memberName) || GROUP_MEMBERS[0];
  const fin = calculateFinancials();

  const paid = fin.paidAmounts[member.name] || 0;
  const share = fin.shareAmounts[member.name] || 0;
  const bal = Math.round((fin.balances[member.name] || 0) * 100) / 100;

  // Header and Hero Info
  elements.dashAvatar.textContent = member.initial;
  elements.dashAvatar.style.background = member.gradient;
  elements.dashPersonName.textContent = member.name;
  elements.dashSectionPersonName.textContent = member.name;
  document.querySelectorAll('.current-dash-name').forEach(el => el.textContent = member.name);

  // Status Badge and Dot
  if (bal > 0.5) {
    elements.dashStatusDot.style.background = '#10b981';
    elements.dashStatusBadge.className = 'person-status-badge balance-badge positive';
    elements.dashStatusBadge.innerHTML = `<span>Gets Back ${formatCurrency(bal)} 🎉</span>`;
  } else if (bal < -0.5) {
    elements.dashStatusDot.style.background = '#f43f5e';
    elements.dashStatusBadge.className = 'person-status-badge balance-badge negative';
    elements.dashStatusBadge.innerHTML = `<span>Needs to Pay ${formatCurrency(Math.abs(bal))} ⚠️</span>`;
  } else {
    elements.dashStatusDot.style.background = '#64748b';
    elements.dashStatusBadge.className = 'person-status-badge balance-badge settled';
    elements.dashStatusBadge.innerHTML = `<span>All Settled Up ✨</span>`;
  }

  // 3 KPI Tiles
  elements.dashTotalPaid.textContent = formatCurrency(paid);
  elements.dashTotalShare.textContent = formatCurrency(share);
  elements.dashNetBalance.textContent = bal >= 0 ? `+${formatCurrency(bal)}` : `-${formatCurrency(Math.abs(bal))}`;
  elements.dashNetBalance.style.color = bal > 0.5 ? '#34d399' : bal < -0.5 ? '#fb7185' : '#ffffff';

  // Settlement Matrix for this Person
  const optimalTransfers = calculateOptimalSettlements(fin.balances);
  
  // Receivables: transfers where TO === member.name
  const receivables = optimalTransfers.filter(t => t.to === member.name);
  elements.dashReceivablesList.innerHTML = '';
  if (receivables.length === 0) {
    elements.dashReceivablesList.innerHTML = `
      <div class="empty-settle-notice">Nobody currently owes ${member.name}.</div>
    `;
  } else {
    receivables.forEach(r => {
      const row = document.createElement('div');
      row.className = 'settle-item-row';
      row.innerHTML = `
        <span class="settle-item-name">${r.from} owes ${member.name}</span>
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="settle-item-amt text-green">${formatCurrency(r.amount)}</span>
          <button class="btn-settle-mini" data-from="${r.from}" data-to="${member.name}" data-amt="${r.amount}">
            Settle
          </button>
        </div>
      `;
      row.querySelector('.btn-settle-mini').addEventListener('click', () => {
        openSettleModal(r.from, member.name, r.amount);
      });
      elements.dashReceivablesList.appendChild(row);
    });
  }

  // Payables: transfers where FROM === member.name
  const payables = optimalTransfers.filter(t => t.from === member.name);
  elements.dashPayablesList.innerHTML = '';
  if (payables.length === 0) {
    elements.dashPayablesList.innerHTML = `
      <div class="empty-settle-notice">${member.name} owes nobody. All clear!</div>
    `;
  } else {
    payables.forEach(p => {
      const row = document.createElement('div');
      row.className = 'settle-item-row';
      row.innerHTML = `
        <span class="settle-item-name">${member.name} owes ${p.to}</span>
        <div style="display:flex; align-items:center; gap:8px;">
          <span class="settle-item-amt text-red">${formatCurrency(p.amount)}</span>
          <button class="btn-settle-mini" data-from="${member.name}" data-to="${p.to}" data-amt="${p.amount}">
            Pay
          </button>
        </div>
      `;
      row.querySelector('.btn-settle-mini').addEventListener('click', () => {
        openSettleModal(member.name, p.to, p.amount);
      });
      elements.dashPayablesList.appendChild(row);
    });
  }

  // Category Breakdown for this Person's consumption
  renderPersonCategoryBreakdown(member.name);

  // Activity Feed for this Person
  renderPersonTransactions(member.name);

  if (window.lucide) lucide.createIcons();
}

// Category breakdown consumed by individual
function renderPersonCategoryBreakdown(memberName) {
  elements.dashCategoryBars.innerHTML = '';
  const catShares = {};
  Object.keys(CATEGORIES).forEach(k => catShares[k] = 0);
  let totalPersonShare = 0;

  appState.expenses.forEach(exp => {
    const cat = exp.category || 'misc';
    if (exp.splits && exp.splits.length > 0) {
      const split = exp.splits.find(s => s.person_name === memberName);
      if (split) {
        const amt = parseFloat(split.share_amount) || 0;
        catShares[cat] = (catShares[cat] || 0) + amt;
        totalPersonShare += amt;
      }
    }
  });

  const total = totalPersonShare || 1;

  Object.keys(CATEGORIES).forEach(catKey => {
    const cat = CATEGORIES[catKey];
    const amt = catShares[catKey] || 0;
    const pct = Math.round((amt / total) * 100);

    if (amt > 0 || totalPersonShare === 0) {
      const item = document.createElement('div');
      item.className = 'category-bar-item';
      item.innerHTML = `
        <div class="cat-bar-header">
          <span class="cat-bar-name">
            <span>${cat.icon}</span>
            <span>${cat.name}</span>
          </span>
          <span class="cat-bar-amt">${formatCurrency(amt)} (${pct}%)</span>
        </div>
        <div class="cat-progress-bg">
          <div class="cat-progress-fill" style="width: ${pct}%; background: ${cat.color};"></div>
        </div>
      `;
      elements.dashCategoryBars.appendChild(item);
    }
  });

  if (totalPersonShare === 0) {
    elements.dashCategoryBars.innerHTML = `
      <p style="font-size: 0.78rem; color: #64748b; text-align: center; padding: 6px;">
        No expense shares recorded for ${memberName} yet.
      </p>
    `;
  }
}

// Activity feed involving this individual
function renderPersonTransactions(memberName) {
  elements.dashPersonTransactionsList.innerHTML = '';

  const list = appState.expenses.filter(exp => {
    const isPayer = exp.paid_by === memberName;
    const isParticipant = exp.splits && exp.splits.some(s => s.person_name === memberName);
    
    if (appState.timelineFilter === 'paid') return isPayer;
    if (appState.timelineFilter === 'shared') return isParticipant && !isPayer;
    return isPayer || isParticipant;
  });

  if (list.length === 0) {
    elements.dashPersonTransactionsList.innerHTML = `
      <p style="font-size: 0.8rem; color: #64748b; text-align: center; padding: 14px;">
        No matching activities for this filter.
      </p>
    `;
    return;
  }

  list.forEach(exp => {
    const isPayer = exp.paid_by === memberName;
    const userSplit = exp.splits ? exp.splits.find(s => s.person_name === memberName) : null;
    const userShareAmt = userSplit ? userSplit.share_amount : 0;
    const cat = CATEGORIES[exp.category] || CATEGORIES.misc;

    const card = document.createElement('div');
    card.className = 'transaction-card';
    card.innerHTML = `
      <div class="tx-left">
        <div class="tx-cat-icon">${cat.icon}</div>
        <div class="tx-info">
          <span class="tx-title">${escapeHtml(exp.description)}</span>
          <span class="tx-subtitle">
            ${isPayer ? `You paid ${formatCurrency(exp.amount)}` : `${exp.paid_by} paid`} • ${exp.date || 'Today'}
          </span>
        </div>
      </div>
      <div class="tx-right">
        <span class="tx-amount" style="color: ${isPayer ? '#34d399' : '#fb7185'}">
          ${isPayer ? `+${formatCurrency(exp.amount)}` : `-${formatCurrency(userShareAmt)}`}
        </span>
        <span class="tx-split-tag">${isPayer ? 'Paid by them' : 'Their share'}</span>
      </div>
    `;

    elements.dashPersonTransactionsList.appendChild(card);
  });
}

// ----------------------------------------------------
// EVENT LISTENERS & NAVIGATION
// ----------------------------------------------------
function setupEventListeners() {
  // Main Top-level Tabs
  elements.tabAddExpense.addEventListener('click', () => switchTab('add-view'));
  elements.tabSeeExpense.addEventListener('click', () => switchTab('see-view'));

  // Subtabs in See Expense
  elements.subTabEveryone.addEventListener('click', () => switchSubTab('everyone'));
  elements.subTabIndividual.addEventListener('click', () => switchSubTab('individual'));

  // Back from Individual Dashboard to All Friends
  elements.btnBackToIndividualList.addEventListener('click', () => {
    switchTab('see-view');
    switchSubTab('individual');
  });

  // Quick Settle button in Dashboard
  elements.btnQuickSettleDashboard.addEventListener('click', () => {
    if (appState.activeDashboardMember) {
      elements.settleFromPerson.value = appState.activeDashboardMember;
      openSettleModal(appState.activeDashboardMember);
    } else {
      openSettleModal();
    }
  });

  // Split Mode switcher
  elements.btnModeSplit.addEventListener('click', () => {
    appState.splitMode = 'split';
    elements.btnModeSplit.classList.add('active');
    elements.btnModeIndividual.classList.remove('active');
    elements.splitExpenseDetails.classList.remove('hidden');
    elements.individualExpenseDetails.classList.add('hidden');
    updateSplitPreview();
  });

  elements.btnModeIndividual.addEventListener('click', () => {
    appState.splitMode = 'individual';
    elements.btnModeIndividual.classList.add('active');
    elements.btnModeSplit.classList.remove('active');
    elements.splitExpenseDetails.classList.add('hidden');
    elements.individualExpenseDetails.classList.remove('hidden');
    updateSplitPreview();
  });

  // Select all members button
  elements.selectAllMembersBtn.addEventListener('click', () => {
    appState.selectedSplitMembers = GROUP_MEMBERS.map(m => m.name);
    document.querySelectorAll('.member-chip').forEach(c => c.classList.add('selected'));
    updateSplitPreview();
  });

  // Live calculation on amount input
  elements.expenseAmount.addEventListener('input', updateSplitPreview);

  // Quick Tags
  document.querySelectorAll('.quick-tag').forEach(tag => {
    tag.addEventListener('click', () => {
      const text = tag.textContent.trim();
      if (text.includes('Dinner')) {
        elements.expenseDescription.value = 'Dinner & Drinks';
        elements.expenseCategory.value = 'food';
      } else if (text.includes('Fuel')) {
        elements.expenseDescription.value = 'Fuel & Highway Toll';
        elements.expenseCategory.value = 'travel';
      } else if (text.includes('Stay')) {
        elements.expenseDescription.value = 'Hotel / Resort Bill';
        elements.expenseCategory.value = 'stay';
      } else if (text.includes('Watersports')) {
        elements.expenseDescription.value = 'Watersports & Activity Tickets';
        elements.expenseCategory.value = 'activities';
      } else if (text.includes('Snacks')) {
        elements.expenseDescription.value = 'Snacks & Beverages';
        elements.expenseCategory.value = 'shopping';
      }
      elements.expenseAmount.focus();
      updateSplitPreview();
    });
  });

  // Submit Expense Form
  elements.expenseForm.addEventListener('submit', handleAddExpenseSubmit);

  // Search & Filter
  elements.expenseSearchInput.addEventListener('input', (e) => {
    appState.searchTerm = e.target.value;
    renderTransactionsList();
  });

  elements.expenseCategoryFilter.addEventListener('change', (e) => {
    appState.categoryFilter = e.target.value;
    renderTransactionsList();
  });

  // Individual Dashboard Timeline Filter
  elements.timelineFilterAll.addEventListener('click', () => {
    setTimelineFilter('all', elements.timelineFilterAll);
  });
  elements.timelineFilterPaid.addEventListener('click', () => {
    setTimelineFilter('paid', elements.timelineFilterPaid);
  });
  elements.timelineFilterShared.addEventListener('click', () => {
    setTimelineFilter('shared', elements.timelineFilterShared);
  });

  // Modals
  elements.closeSettleModal.addEventListener('click', closeSettleModal);
  elements.cancelSettleBtn.addEventListener('click', closeSettleModal);
  elements.settleForm.addEventListener('submit', handleSettleSubmit);

  elements.supabaseStatusBtn.addEventListener('click', openSupabaseModal);
  elements.tripMenuBtn.addEventListener('click', openSupabaseModal);
  elements.closeSupabaseModal.addEventListener('click', closeSupabaseModal);
  elements.supabaseConfigForm.addEventListener('submit', handleSupabaseConfigSubmit);

  // Copy SQL Schema
  elements.copySqlBtn.addEventListener('click', handleCopySql);

  // Reset & Clear data
  elements.btnResetDemoData.addEventListener('click', async () => {
    if (confirm('Reset trip back to starter Goa trip demo data?')) {
      window.supabaseService.resetToDemo();
      await refreshData();
      closeSupabaseModal();
      showToast('Demo data restored!', 'success');
    }
  });

  elements.btnClearAllData.addEventListener('click', async () => {
    if (confirm('Clear all trip expenses and start fresh? This cannot be undone.')) {
      window.supabaseService.clearAllData();
      await refreshData();
      closeSupabaseModal();
      showToast('Trip data cleared', 'normal');
    }
  });
}

function setTimelineFilter(filter, activeBtn) {
  appState.timelineFilter = filter;
  [elements.timelineFilterAll, elements.timelineFilterPaid, elements.timelineFilterShared].forEach(b => b.classList.remove('active'));
  activeBtn.classList.add('active');
  if (appState.activeDashboardMember) {
    renderPersonTransactions(appState.activeDashboardMember);
  }
}

// Tab Switching
function switchTab(targetTab) {
  appState.activeTab = targetTab;

  elements.tabAddExpense.classList.toggle('active', targetTab === 'add-view');
  elements.tabSeeExpense.classList.toggle('active', targetTab === 'see-view' || targetTab === 'dashboard-view');

  elements.addView.classList.toggle('hidden', targetTab !== 'add-view');
  elements.seeView.classList.toggle('hidden', targetTab !== 'see-view');
  elements.individualDashboardView.classList.toggle('hidden', targetTab !== 'dashboard-view');
}

function switchSubTab(subTab) {
  appState.activeSubTab = subTab;
  elements.subTabEveryone.classList.toggle('active', subTab === 'everyone');
  elements.subTabIndividual.classList.toggle('active', subTab === 'individual');

  elements.everyoneContent.classList.toggle('hidden', subTab !== 'everyone');
  elements.individualContent.classList.toggle('hidden', subTab !== 'individual');

  if (window.lucide) lucide.createIcons();
}

// Handle Add Expense Form Submit
async function handleAddExpenseSubmit(e) {
  e.preventDefault();

  const amount = parseFloat(elements.expenseAmount.value);
  const description = elements.expenseDescription.value.trim();
  const category = elements.expenseCategory.value;
  const paid_by = appState.selectedPayer;
  const date = elements.expenseDate.value || new Date().toISOString().split('T')[0];

  if (!amount || amount <= 0) {
    showToast('Please enter a valid amount', 'error');
    return;
  }

  if (!description) {
    showToast('Please enter an expense description', 'error');
    return;
  }

  // Calculate splits
  let splits = [];
  if (appState.splitMode === 'split') {
    const included = appState.selectedSplitMembers;
    if (included.length === 0) {
      showToast('Select at least one member to split with', 'error');
      return;
    }
    const perShare = Math.round((amount / included.length) * 100) / 100;
    splits = included.map(name => ({
      person_name: name,
      share_amount: perShare
    }));
  } else {
    // Individual expense
    const target = appState.selectedIndividualTarget;
    splits = [{
      person_name: target,
      share_amount: amount
    }];
  }

  const newExpenseData = {
    description,
    amount,
    category,
    paid_by,
    split_type: appState.splitMode,
    date,
    splits
  };

  try {
    await window.supabaseService.addExpense(newExpenseData);
    showToast(`Expense ₹${amount} saved successfully!`, 'success');

    // Reset Form
    elements.expenseForm.reset();
    elements.expenseDate.value = new Date().toISOString().split('T')[0];
    updateSplitPreview();

    // Refresh and auto-navigate to See Expense
    await refreshData();
    switchTab('see-view');
    switchSubTab('everyone');
  } catch (err) {
    console.error('Failed to add expense:', err);
    showToast('Failed to save expense', 'error');
  }
}

// Settlement Modal Handlers
function openSettleModal(fromPerson = '', toPerson = '', amount = '') {
  if (fromPerson) elements.settleFromPerson.value = fromPerson;
  if (toPerson) elements.settleToPerson.value = toPerson;
  if (amount) elements.settleAmount.value = amount;
  elements.settleModal.classList.remove('hidden');
}

function closeSettleModal() {
  elements.settleModal.classList.add('hidden');
  elements.settleForm.reset();
}

async function handleSettleSubmit(e) {
  e.preventDefault();
  const from_person = elements.settleFromPerson.value;
  const to_person = elements.settleToPerson.value;
  const amount = parseFloat(elements.settleAmount.value);
  const notes = elements.settleNote.value.trim() || 'Direct settlement';

  if (from_person === to_person) {
    showToast('Payer and receiver cannot be the same person', 'error');
    return;
  }

  if (!amount || amount <= 0) {
    showToast('Please enter a valid settlement amount', 'error');
    return;
  }

  try {
    await window.supabaseService.addSettlement({
      from_person,
      to_person,
      amount,
      notes
    });

    closeSettleModal();
    showToast(`Settlement of ${formatCurrency(amount)} recorded!`, 'success');
    await refreshData();
  } catch (err) {
    console.error('Settlement error:', err);
    showToast('Failed to record settlement', 'error');
  }
}

// Supabase Modal & Connection Handlers
function openSupabaseModal() {
  const cfg = window.supabaseService.config;
  elements.supabaseUrl.value = cfg.url || '';
  elements.supabaseAnonKey.value = cfg.anonKey || '';
  updateConnectionBadge();
  elements.supabaseModal.classList.remove('hidden');
}

function closeSupabaseModal() {
  elements.supabaseModal.classList.add('hidden');
}

function updateConnectionBadge() {
  if (window.supabaseService.isConnected) {
    elements.supabaseStatusBtn.className = 'status-pill status-online';
    elements.statusLabel.textContent = 'Supabase Live';
    elements.modalConnectionStatus.textContent = 'Connected to Supabase Cloud';
    elements.modalStatusDetail.textContent = 'Expenses are syncing in real-time across your group.';
  } else {
    elements.supabaseStatusBtn.className = 'status-pill status-local';
    elements.statusLabel.textContent = 'Local Storage';
    elements.modalConnectionStatus.textContent = 'Using Local Storage Mode';
    elements.modalStatusDetail.textContent = 'Expenses are saved offline in browser. Enter Supabase keys to sync live.';
  }
}

async function handleSupabaseConfigSubmit(e) {
  e.preventDefault();
  const url = elements.supabaseUrl.value.trim();
  const key = elements.supabaseAnonKey.value.trim();

  if (!url || !key) {
    showToast('Please provide both Supabase URL and Anon Key', 'error');
    return;
  }

  showToast('Connecting to Supabase...', 'normal');
  const res = await window.supabaseService.saveConfig(url, key);

  if (res && res.success) {
    showToast('Connected to Supabase successfully!', 'success');
    closeSupabaseModal();
    await refreshData();
  } else {
    showToast(`Supabase connection error: ${res ? res.error : 'Verify URL/Key and schema'}`, 'error');
  }
  updateConnectionBadge();
}

async function handleCopySql() {
  const sqlContent = `-- SquadSplit Database Schema
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    category TEXT NOT NULL,
    paid_by TEXT NOT NULL,
    split_type TEXT NOT NULL DEFAULT 'equal',
    date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS expense_splits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    expense_id UUID REFERENCES expenses(id) ON DELETE CASCADE,
    person_name TEXT NOT NULL,
    share_amount NUMERIC(10, 2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS settlements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    from_person TEXT NOT NULL,
    to_person TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    notes TEXT DEFAULT 'Settlement payment',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE expense_splits ENABLE ROW LEVEL SECURITY;
ALTER TABLE settlements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read expenses" ON expenses FOR SELECT USING (true);
CREATE POLICY "Public insert expenses" ON expenses FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete expenses" ON expenses FOR DELETE USING (true);

CREATE POLICY "Public read expense_splits" ON expense_splits FOR SELECT USING (true);
CREATE POLICY "Public insert expense_splits" ON expense_splits FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete expense_splits" ON expense_splits FOR DELETE USING (true);

CREATE POLICY "Public read settlements" ON settlements FOR SELECT USING (true);
CREATE POLICY "Public insert settlements" ON settlements FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete settlements" ON settlements FOR DELETE USING (true);`;

  try {
    await navigator.clipboard.writeText(sqlContent);
    showToast('SQL schema copied to clipboard! Paste in Supabase SQL editor.', 'success');
  } catch (err) {
    showToast('Check schema.sql in workspace directory', 'normal');
  }
}

// Utility: Escape HTML string to prevent XSS
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Start App on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});
