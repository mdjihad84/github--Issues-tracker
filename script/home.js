const apiCard = () => {
    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    fetch(url)
      .then((res) => res.json())
      .then((data) => serverData(data.data));
};


// {
//     "id": 44,
//     "title": "Add favorites/bookmarks feature",
//     "description": "Allow users to bookmark frequently accessed pages or items for quick access.",
//     "status": "open",
//     "labels": [
//         "enhancement",
//         "good first issue"
//     ],
//     "priority": "low",
//     "author": "fav_frank",
//     "assignee": "",
//     "createdAt": "2024-02-07T10:30:00Z",
//     "updatedAt": "2024-02-07T10:30:00Z"
// }
const serverData = (recevedData) => {
    
    const serverData = document.getElementById("homeCard");
    serverData.innerHTML = '';

    
    recevedData.forEach(item => {
        const createElement = document.createElement('div');
        createElement.innerHTML = `
        <div class="max-w-6xl mx-auto">
            <div class="bg-white rounded-2xl shadow-sm border-t-4 border-emerald-500 hover:shadow-md transition-shadow">
                <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                    <i class="fa-solid fa-circle-check"></i>
                    </div>
                        <span class="bg-red-50 text-red-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">${item.priority}</span>
                    </div>
    
                    <h3 class="text-lg font-bold text-slate-800 mb-2 leading-snug">${item.title}</h3>
                    <p class="text-slate-500 text-sm mb-6 line-clamp-2">${item.description}</p>
    
                    <div class="flex flex-wrap gap-2">
                        ${item.labels
                        .map(
                            (label) => `
                            <div class="badge badge-outline border-slate-200 text-slate-500 text-[10px] py-3.5 px-3 gap-1.5 uppercase font-bold bg-white h-auto">
                                <i class="fa-solid ${label.toLowerCase().includes("bug") ? "fa-bug text-red-400" : "fa-circle-info text-amber-400"}"></i>
                                ${label}
                            </div>`,
                        )
                        .join("")}
                    </div>
                    <div class="mt-5 border-t border-slate-50 flex justify-between items-center text-slate-400">
                        <span class="text-xs font-medium">#1 by <span class="text-slate-600">${item.author}</span></span>
                        <span class="text-[10px]">${item.createdAt}</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>`;

        serverData.appendChild(createElement);
    })
};

apiCard();