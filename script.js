class TeamDashboard {
    constructor() {
        this.init();
    }

    init() {
        this.updateLastUpdated();
        this.loadData();
        this.setupEventListeners();
        
        // Auto-refresh every 5 minutes
        setInterval(() => {
            this.loadData();
        }, 300000);
    }

    updateLastUpdated() {
        const now = new Date();
        const formatted = now.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        document.getElementById('lastUpdated').textContent = formatted;
    }

    async loadData() {
        try {
            await Promise.all([
                this.loadMetrics(),
                this.loadUpdates()
            ]);
        } catch (error) {
            console.error('Error loading data:', error);
            this.showError('Failed to load dashboard data');
        }
    }

    async loadMetrics() {
        try {
            const response = await fetch('data/metrics.json');
            if (!response.ok) throw new Error('Failed to load metrics');
            
            const metrics = await response.json();
            this.updateMetrics(metrics);
        } catch (error) {
            console.error('Error loading metrics:', error);
            this.loadSampleMetrics();
        }
    }

    async loadUpdates() {
        try {
            const response = await fetch('data/updates.json');
            if (!response.ok) throw new Error('Failed to load updates');
            
            const updates = await response.json();
            this.updateUpdates(updates);
        } catch (error) {
            console.error('Error loading updates:', error);
            this.loadSampleUpdates();
        }
    }

    updateMetrics(metrics) {
        document.getElementById('copperRuns').textContent = metrics.copperRuns || 0;
        document.getElementById('fiberRuns').textContent = metrics.fiberRuns || 0;
        document.getElementById('bricksPatched').textContent = metrics.bricksPatched || 0;
        document.getElementById('fusionRacks').textContent = metrics.fusionRacks || 0;
        document.getElementById('errorsRework').textContent = metrics.errorsRework || 0;
    }

    updateUpdates(updates) {
        this.renderUpdates('companyUpdates', updates.company || []);
        this.renderUpdates('siteUpdates', updates.site || []);
    }

    renderUpdates(containerId, updates) {
        const container = document.getElementById(containerId);
        
        if (updates.length === 0) {
            container.innerHTML = '<p style="color: #7f8c8d; font-style: italic;">No updates available</p>';
            return;
        }

        container.innerHTML = updates.map(update => `
            <div class="update-item">
                <div class="update-date">${this.formatDate(update.date)}</div>
                <div class="update-title">${update.title}</div>
                <div class="update-content">${update.content}</div>
            </div>
        `).join('');
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    loadSampleMetrics() {
        const sampleMetrics = {
            copperRuns: 45,
            fiberRuns: 32,
            bricksPatched: 18,
            fusionRacks: 12,
            errorsRework: 3
        };
        this.updateMetrics(sampleMetrics);
    }

    loadSampleUpdates() {
        const sampleUpdates = {
            company: [
                {
                    date: '2026-01-06',
                    title: 'Q1 Goals Announced',
                    content: 'New quarterly targets have been set. Focus on fiber deployment and quality improvements.'
                },
                {
                    date: '2026-01-03',
                    title: 'Safety Training Reminder',
                    content: 'All team members must complete safety certification by January 15th.'
                }
            ],
            site: [
                {
                    date: '2026-01-06',
                    title: 'Building A - Fiber Installation',
                    content: 'Fiber runs completed on floors 1-3. Floor 4 scheduled for tomorrow.'
                },
                {
                    date: '2026-01-05',
                    title: 'Equipment Delivery',
                    content: 'New fusion splicers arrived. Available for checkout from equipment room.'
                }
            ]
        };
        this.updateUpdates(sampleUpdates);
    }

    setupEventListeners() {
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshData();
        });
    }

    refreshData() {
        const refreshBtn = document.getElementById('refreshBtn');
        const icon = refreshBtn.querySelector('i');
        
        icon.style.animation = 'spin 1s linear infinite';
        refreshBtn.disabled = true;
        
        this.loadData().finally(() => {
            setTimeout(() => {
                icon.style.animation = '';
                refreshBtn.disabled = false;
                this.updateLastUpdated();
            }, 1000);
        });
    }

    showError(message) {
        console.error(message);
        // You could add a toast notification here
    }
}

// Initialize dashboard when page loads
document.addEventListener('DOMContentLoaded', () => {
    new TeamDashboard();
});
