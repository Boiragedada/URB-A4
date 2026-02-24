let jobs = [
    { id: 1, company: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "$130,000 - $175,000", description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status: "all" },
    { id: 2, company: "WebFlow Agency", position: "Web Designer & Developer", location: "Los Angeles, CA", type: "Part-time", salary: "$80,000 - $120,000", description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern trends.", status: "all" },
    { id: 3, company: "Tech Solutions Ltd", position: "Frontend Engineer", location: "Dhaka, BD", type: "Full-time", salary: "৳60,000 - ৳80,000", description: "Develop and maintain user-facing features using modern React.js and Tailwind CSS frameworks.", status: "all" },
    { id: 4, company: "Creative Minds", position: "UI/UX Designer", location: "San Francisco", type: "Contract", salary: "$90,000 - $110,000", description: "Design intuitive user interfaces and conduct user research to improve the overall product experience.", status: "all" },
    { id: 5, company: "DataSync Inc", position: "Backend Developer", location: "Remote", type: "Full-time", salary: "$140,000 - $160,000", description: "Scale our backend infrastructure using Node.js and MongoDB. Focus on performance.", status: "all" },
    { id: 6, company: "AppVantage", position: "Mobile App Developer", location: "London, UK", type: "Full-time", salary: "£50,000 - £70,000", description: "Design and build advanced applications for the Android and iOS platforms.", status: "all" },
    { id: 7, company: "CyberGuard", position: "Security Specialist", location: "New York", type: "Full-time", salary: "$150,000+", description: "Protect our clients' digital assets by implementing advanced security protocols.", status: "all" },
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
            <div class="flex flex-col items-center justify-center py-20">
                <i class="fa-regular fa-file-lines text-7xl text-blue-500 opacity-30 mb-4"></i>
                <h3 class="text-2xl font-bold text-blue-900 opacity-60">No jobs available</h3>
                <p class="text-gray-400">Check back soon for new job opportunities.</p>
            </div>`;
    } else {
        filtered.forEach(job => {
            const card = document.createElement('div');
            card.className = "bg-white p-8 rounded-xl border border-gray-100 shadow-sm relative transition-all hover:shadow-md";
            card.innerHTML = `
                <button onclick="deleteJob(${job.id})" class="absolute top-6 right-6 text-gray-300 hover:text-red-500">
                    <i class="fa-solid fa-trash-can text-xl"></i>
                </button>

                <h3 class="text-xl font-bold text-blue-900">${job.company}</h3>
                <p class="text-blue-500 font-bold mb-1">${job.position}</p>
                <p class="text-xs text-gray-400 mb-4 uppercase font-semibold">${job.location} • ${job.type} • ${job.salary}</p>
                
                <p class="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-2">
                    ${job.status === 'all' ? 'NOT APPLIED' : job.status}
                </p>
                <p class="text-gray-500 text-sm leading-relaxed mb-6">${job.description}</p>
                
                <div class="flex gap-3">
                    <button onclick="updateStatus(${job.id}, 'interview')" class="btn btn-sm btn-outline btn-success uppercase text-[10px] font-bold px-6">Interview</button>
                    <button onclick="updateStatus(${job.id}, 'rejected')" class="btn btn-sm btn-outline btn-error opacity-50 uppercase text-[10px] font-bold px-6">Rejected</button>
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
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active', 'bg-blue-600', 'text-white'));
    const activeTab = document.getElementById(`tab-${tab}`);
    activeTab.classList.add('tab-active', 'bg-blue-600', 'text-white');
    renderJobs();
}

function updateDashboard() {
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('int-count').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('rej-count').innerText = jobs.filter(j => j.status === 'rejected').length;
}

renderJobs();