let allIssues = []; // এখানে ডাটা জমা থাকবে ফিল্টার করার জন্য

const apiCard = () => {
  const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      allIssues = data.data; // ১. ফেচ করা ডাটা গ্লোবাল ভ্যারিয়েবলে সেভ করো
      serverData(allIssues); // ২. শুরুতে সব ডাটা দেখাও
    });
};

const serverData = (recevedData) => {

    const totalCountElement = document.getElementById("total-issue-count");
    if (totalCountElement) {
      totalCountElement.innerText = `${recevedData.length} Issues`;
    }

  const cardContainer = document.getElementById("homeCard");
  cardContainer.innerHTML = "";

  recevedData.forEach((item) => {
    const createElement = document.createElement("div");
    createElement.innerHTML = `
        <div class="max-w-6xl mx-auto mb-4">
            <div class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow 
                ${item.status === "closed" ? "border-t-4 border-purple-500" : "border-t-4 border-emerald-500"}">
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
                            </div>
                        `,
                          )
                          .join("")}
                    </div>
                    <div class="mt-5 border-t border-slate-50 flex justify-between items-center text-slate-400">
                        <span class="text-xs font-medium">#${item.id} by <span class="text-slate-600">${item.author}</span></span>
                        <span class="text-[10px]">${new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>`;
    cardContainer.appendChild(createElement);
  });
};

const filterByStatus = (status) => {
  const filteredIssues =
    status === "all"
      ? allIssues
      : allIssues.filter((item) => item.status === status);
  serverData(filteredIssues); // তোমার ফাংশন নাম ছিল serverData, তাই এটাই কল করো
};

// ইভেন্ট লিসেনার
document
  .getElementById("btn-all")
  .addEventListener("click", () => filterByStatus("all"));
document
  .getElementById("btn-open")
  .addEventListener("click", () => filterByStatus("open"));
document
  .getElementById("btn-closed")
  .addEventListener("click", () => filterByStatus("closed"));

apiCard();
