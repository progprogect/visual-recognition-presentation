// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Implementation option tabs
function showOption(optionNumber) {
    // Hide all options
    document.querySelectorAll('.implementation-option').forEach(option => {
        option.classList.add('hidden');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    
    // Show selected option
    document.getElementById(`option${optionNumber}`).classList.remove('hidden');
    
    // Add active class to clicked tab
    event.target.classList.add('active');
}

// Initialize charts when dashboards come into view
const dashboardObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const dashboardId = entry.target.id;
            if (dashboardId === 'dashboard1') {
                setTimeout(() => initQualityChart(), 100);
            } else if (dashboardId === 'dashboard2-content') {
                setTimeout(() => initWeightChart(), 100);
            } else if (dashboardId === 'dashboard3-content') {
                setTimeout(() => initTrendChart(), 100);
            }
        }
    });
}, { threshold: 0.5 });

// Observe dashboard sections
document.addEventListener('DOMContentLoaded', function() {
    const dashboard1 = document.getElementById('dashboard1');
    const dashboard2 = document.getElementById('dashboard2-content');
    const dashboard3 = document.getElementById('dashboard3-content');
    
    if (dashboard1) dashboardObserver.observe(dashboard1);
    if (dashboard2) dashboardObserver.observe(dashboard2);
    if (dashboard3) dashboardObserver.observe(dashboard3);
});

// Chart initialization functions
function initQualityChart() {
    const canvas = document.getElementById('qualityChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = 200;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Chart data
    const data = [
        { label: 'Ripe', value: 68, color: '#10b981' },
        { label: 'Unripe', value: 18, color: '#f59e0b' },
        { label: 'Dark', value: 9, color: '#6b7280' },
        { label: 'Spoiled', value: 5, color: '#ef4444' }
    ];
    
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = (canvas.width - 100) / data.length;
    const maxBarHeight = canvas.height - 60;
    
    // Draw bars
    data.forEach((item, index) => {
        const barHeight = (item.value / maxValue) * maxBarHeight;
        const x = 50 + index * barWidth + barWidth / 4;
        const y = canvas.height - 40 - barHeight;
        
        // Draw bar
        ctx.fillStyle = item.color;
        ctx.fillRect(x, y, barWidth / 2, barHeight);
        
        // Draw value label
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 14px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.value + '%', x + barWidth / 4, y - 5);
        
        // Draw category label
        ctx.fillStyle = '#6b7280';
        ctx.font = '12px sans-serif';
        ctx.fillText(item.label, x + barWidth / 4, canvas.height - 20);
    });
}

function initWeightChart() {
    const canvas = document.getElementById('weightChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = 250;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Pie chart data
    const data = [
        { label: 'Ripe', value: 848, color: '#10b981' },
        { label: 'Unripe', value: 224, color: '#f59e0b' },
        { label: 'Dark', value: 112, color: '#6b7280' },
        { label: 'Spoiled', value: 63, color: '#ef4444' }
    ];
    
    const total = data.reduce((sum, item) => sum + item.value, 0);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 3;
    
    let currentAngle = -Math.PI / 2;
    
    // Draw pie slices
    data.forEach((item, index) => {
        const sliceAngle = (item.value / total) * 2 * Math.PI;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.value + ' kg', labelX, labelY);
        
        currentAngle += sliceAngle;
    });
    
    // Draw legend
    const legendX = canvas.width - 150;
    const legendY = 20;
    data.forEach((item, index) => {
        ctx.fillStyle = item.color;
        ctx.fillRect(legendX, legendY + index * 25, 15, 15);
        
        ctx.fillStyle = '#1f2937';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(item.label + ': ' + item.value + ' kg', legendX + 20, legendY + index * 25 + 12);
    });
}

function initTrendChart() {
    const canvas = document.getElementById('trendChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = 250;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Sample trend data (last 7 days)
    const dates = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    const qualityScores = [7.2, 7.5, 7.8, 8.1, 8.0, 8.3, 8.2];
    
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const maxScore = 10;
    
    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(canvas.width - padding, y);
        ctx.stroke();
        
        // Y-axis labels
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText((maxScore - (maxScore / 5) * i).toFixed(1), padding - 10, y + 4);
    }
    
    // Draw trend line
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    qualityScores.forEach((score, index) => {
        const x = padding + (chartWidth / (dates.length - 1)) * index;
        const y = padding + chartHeight - (score / maxScore) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.stroke();
    
    // Draw data points
    ctx.fillStyle = '#2563eb';
    qualityScores.forEach((score, index) => {
        const x = padding + (chartWidth / (dates.length - 1)) * index;
        const y = padding + chartHeight - (score / maxScore) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw value label
        ctx.fillStyle = '#1f2937';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(score.toFixed(1), x, y - 10);
        ctx.fillStyle = '#2563eb';
    });
    
    // Draw X-axis labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    dates.forEach((date, index) => {
        const x = padding + (chartWidth / (dates.length - 1)) * index;
        ctx.fillText(date, x, canvas.height - 10);
    });
}

// Reinitialize charts on window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        initQualityChart();
        initWeightChart();
        initTrendChart();
    }, 250);
});

// Animate progress bars on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress-fill, .class-fill');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

document.querySelectorAll('.dashboard-mockup').forEach(mockup => {
    observer.observe(mockup);
});

