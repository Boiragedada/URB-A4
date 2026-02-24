let jobs = [
    { id: 1, company: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "$130,000 - $175,000", description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status: "all" },
    { id: 2, company: "WebFlow Agency", position: "Web Designer & Developer", location: "Los Angeles, CA", type: "Part-time", salary: "$80,000 - $120,000", description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.", status: "all" },
    { id: 3, company: "DataViz Solutions", position: "Data Visualization Specialist", location: "Boston, MA", type: "Full-time", salary: " $125,000 - $165,000", description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.", status: "all" },
    { id: 4, company: "CloudFirst Inc", position: "Backend Developer", location: "Seattle, WA", type: "Full-time", salary: "$90,000 - $110,000", description: "Design intuitive user interfaces and conduct user research to improve the overall product experience.", status: "all" },
    { id: 5, company: "DataSync Inc", position: "Backend Developer", location: "Remote", type: "Full-time", salary: "$140,000 - $160,000", description: "Scale our backend infrastructure using Node.js and MongoDB. Focus on performance and high availability.", status: "all" },
    { id: 6, company: "AppVantage", position: "Mobile App Developer", location: "London, UK", type: "Full-time", salary: "$50,000 - $70,000", description: "Design and build advanced applications for the Android and iOS platforms.", status: "all" },
    { id: 7, company: "CyberGuard", position: "Security Specialist", location: "New York", type: "Full-time", salary: "$150,000+", description: "Protect our clients' digital assets by implementing advanced security protocols and monitoring systems.", status: "all" },
    { id: 8, company: "Pixel Perfect", position: "Software QA Engineer", location: "Remote", type: "Part-time", salary: "$40,000 - $60,000", description: "Perform manual and automated testing to ensure the highest quality of software releases.", status: "all" }
];

let currentTab = 'all';

function renderJobs() {
    const list = document.getElementById('jobs-list');
    const filtered = currentTab === 'all' ? jobs : jobs.filter(j => j.status === currentTab);
    
    document.getElementById('tab-job-count').innerText = filtered.length;
    list.innerHTML = "";

    if (filtered.length === 0) {
        list.innerHTML = `
            <div class="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <img src="/file-icon.png" alt="fole-icon" class="w-20">
                <h3 class="text-xl font-bold text-black">No jobs available</h3>
                <p class="text-gray-400">Check back soon for new job opportunities.</p>
            </div>`;
    } else {
        filtered.forEach(job => {
            const card = document.createElement('div');
            card.className = "bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 relative transition-all hover:shadow-md";
            
            card.innerHTML = `
                <button onclick="deleteJob(${job.id})" class="absolute top-6 right-6 text-gray-300 hover:text-red-500 transition-colors" title="Delete">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>

                <h3 class="text-xl font-bold text-[#1E293B]">${job.company}</h3>
                <p class="text-blue-500 font-semibold mb-2">${job.position}</p>
                <p class="text-xs text-gray-500 mb-4">${job.location} • ${job.type} • ${job.salary}</p>
                
                <p class="text-[10px] font-black text-blue-900 uppercase tracking-widest mb-2">
                    ${job.status === 'all' ? 'NOT APPLIED' : job.status}
                </p>
                <p class="text-gray-600 text-sm leading-relaxed mb-6">${job.description}</p>
                
                <div class="flex gap-3">
                    <button onclick="updateStatus(${job.id}, 'interview')" class="border-2 ${job.status === 'interview' ? 'bg-green-600 text-white border-green-600' : 'border-green-600 text-green-600'} px-6 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:bg-green-600 hover:text-white transition-all">Interview</button>
                    <button onclick="updateStatus(${job.id}, 'rejected')" class="border-2 ${job.status === 'rejected' ? 'bg-red-500 text-white border-red-500' : 'border-red-200 text-red-400'} px-6 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all">Rejected</button>
                </div>
            `;
            list.appendChild(card);
        });
    }
    updateDashboard();
}

function updateStatus(id, newStatus) {
    const job = jobs.find(j => j.id === id);
    if (job) {
        job.status = (job.status === newStatus) ? 'all' : newStatus;
        renderJobs();
    }
}

function deleteJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    renderJobs();
}

function changeTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('tab-active'));
    document.getElementById(`tab-${tab}`).classList.add('tab-active');
    renderJobs();
}

function updateDashboard() {
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('int-count').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('rej-count').innerText = jobs.filter(j => j.status === 'rejected').length;
}

renderJobs();