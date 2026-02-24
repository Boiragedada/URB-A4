let jobs = [
    { id: 1, company: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "$130,000 - $175,000", description: "Build cross-platform mobile applications using React Native.", status: "all" },
    { id: 2, company: "WebFlow Agency", position: "Web Designer & Developer", location: "Los Angeles, CA", type: "Part-time", salary: "$80,000 - $120,000", description: "Create stunning web experiences for high-profile clients.", status: "all" },
    { id: 3, company: "DataViz Solutions", position: "Frontend Engineer", location: "Dhaka, BD", type: "Full-time", salary: "$60,000 - $80,000", description: "Develop and maintain user-facing features using modern React.js.", status: "all" },
    { id: 4, company: "CloudFirst Inc", position: "UI/UX Designer", location: "San Francisco", type: "Contract", salary: "$90,000 - $110,000", description: "Design intuitive user interfaces and conduct user research.", status: "all" },
    { id: 5, company: "Innovation Labs", position: "Backend Developer", location: "Remote", type: "Full-time", salary: "$140,000 - $160,000", description: "Scale backend infrastructure using Node.js and MongoDB.", status: "all" },
    { id: 6, company: "MegaCorp Solutions", position: "Mobile App Developer", location: "London, UK", type: "Full-time", salary: "$50,000 - $70,000", description: "Build applications for Android and iOS platforms.", status: "all" },
    { id: 7, company: "StartupXYZ", position: "Security Specialist", location: "New York", type: "Full-time", salary: "$150,000+", description: "Protect digital assets by implementing security protocols.", status: "all" },
    { id: 8, company: "TechCorp Industries", position: "Software QA Engineer", location: "Remote", type: "Part-time", salary: "$40,000 - $60,000", description: "Perform manual and automated testing for quality releases.", status: "all" }
];

let currentTab = 'all';

function renderJobs() {
    const list = document.getElementById('jobs-list');
    const filtered = currentTab === 'all' ? jobs : jobs.filter(j => j.status === currentTab);
    
    document.getElementById('tab-job-count').innerText = filtered.length;
    list.innerHTML = "";

    if (filtered.length === 0) {
        list.innerHTML = `
            <div class="flex flex-col items-center justify-center py-24">
                <i class="fa-regular fa-file-lines text-blue-500 text-7xl mb-6 opacity-40"></i>
                <h3 class="text-2xl font-bold text-slate-800">No jobs available</h3>
                <p class="text-slate-400 mt-2 font-medium">Check back soon for new job opportunities.</p>
            </div>`;
    } else {
        filtered.forEach(job => {
            const card = document.createElement('div');
            card.className = "bg-white p-6 md:p-8 rounded-xl border border-slate-100 shadow-sm relative transition-all";
            
            card.innerHTML = `
                <button onclick="deleteJob(${job.id})" class="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors">
                    <i class="fa-solid fa-trash-can text-xl"></i>
                </button>

                <h3 class="text-xl font-bold text-slate-800">${job.company}</h3>
                <p class="text-blue-500 font-semibold mb-1">${job.position}</p>
                <p class="text-xs text-slate-400 mb-5 uppercase">${job.location} • ${job.type} • ${job.salary}</p>
                
                <p class="text-[11px] font-black text-blue-900 uppercase tracking-widest mb-3">
                    ${job.status === 'all' ? 'NOT APPLIED' : job.status}
                </p>
                <p class="text-slate-600 text-sm leading-relaxed mb-8">${job.description}</p>
                
                <div class="flex gap-3">
                    <button onclick="updateStatus(${job.id}, 'interview')" class="border-2 ${job.status === 'interview' ? 'bg-emerald-600 text-white border-emerald-600' : 'border-emerald-600 text-emerald-600'} px-6 py-1.5 rounded font-bold text-[10px] uppercase tracking-wider hover:bg-emerald-600 hover:text-white transition-all">Interview</button>
                    <button onclick="updateStatus(${job.id}, 'rejected')" class="border-2 ${job.status === 'rejected' ? 'bg-red-500 text-white border-red-500' : 'border-red-200 text-red-400'} px-6 py-1.5 rounded font-bold text-[10px] uppercase tracking-wider hover:bg-red-500 hover:text-white transition-all">Rejected</button>
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