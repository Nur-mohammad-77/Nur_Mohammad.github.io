document.addEventListener("DOMContentLoaded", function () {
    // ১. CSS ইন্জেক্ট করা
    const sidebarStyle = document.createElement("style");
    sidebarStyle.innerHTML = `
        .menu-toggle-btn {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 20px;
            cursor: pointer;
            color: white;
            background: #334155;
            padding: 8px 14px;
            border-radius: 8px;
            transition: 0.3s;
            z-index: 100;
        }
        .menu-toggle-btn:hover { background: #2563eb; }

        .custom-sidebar {
            height: 100%;
            width: 270px;
            position: fixed;
            top: 0;
            left: -270px;
            background-color: #0f172a;
            box-shadow: 4px 0 15px rgba(0,0,0,0.3);
            overflow-y: auto;
            transition: 0.3s ease-in-out;
            padding-top: 60px;
            z-index: 1000;
            text-align: left;
        }
        .custom-sidebar.open { left: 0; }

        .sidebar-close-btn {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 22px;
            color: #94a3b8;
            cursor: pointer;
        }
        .sidebar-close-btn:hover { color: white; }

        .custom-sidebar a {
            padding: 14px 25px;
            text-decoration: none;
            font-size: 15px;
            color: #cbd5e1;
            display: block;
            transition: 0.2s;
            font-weight: 500;
            border-bottom: 1px solid #1e293b;
        }
        .custom-sidebar a:hover {
            background-color: #2563eb;
            color: white;
            padding-left: 32px;
        }

        .sidebar-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            z-index: 999;
        }
        .sidebar-overlay.active { display: block; }
    `;
    document.head.appendChild(sidebarStyle);

    // ২. ৩-বার বাটন বসানো
    const header = document.querySelector("header");
    if (header) {
        const toggleBtn = document.createElement("div");
        toggleBtn.className = "menu-toggle-btn";
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        toggleBtn.onclick = window.toggleNavSidebar;
        header.appendChild(toggleBtn);
    }

    // ৩. সাইডবার HTML
    const sidebarHTML = `
        <div id="customSidebar" class="custom-sidebar">
            <div class="sidebar-close-btn" onclick="window.toggleNavSidebar()"><i class="fa-solid fa-xmark"></i></div>
            <a href="javascript:void(0)" onclick="window.triggerSection('home')">🏠 হোম</a>
            <a href="javascript:void(0)" onclick="window.triggerSection('about')">👨‍💻 আমার সম্পর্কে</a>
            <a href="javascript:void(0)" onclick="window.triggerSection('projects')">🤖 প্রজেক্টসমূহ</a>
            <a href="javascript:void(0)" onclick="window.triggerSection('studyHub')">📚 জ্ঞান ও শিক্ষা হাব</a>
            <a href="javascript:void(0)" onclick="window.triggerSection('plans')">🚀 ভবিষ্যৎ প্ল্যান</a>
            <a href="javascript:void(0)" onclick="window.triggerSection('gallery')">📸 গ্যালারি</a>
            <a href="javascript:void(0)" onclick="window.triggerSection('contact')">📲 যোগাযোগ</a>
        </div>
        <div id="sidebarOverlay" class="sidebar-overlay" onclick="window.toggleNavSidebar()"></div>
    `;
    document.body.insertAdjacentHTML("beforeend", sidebarHTML);
});

// ৪. সাইডবার ওপেন/ক্লোজ
window.toggleNavSidebar = function () {
    const sidebar = document.getElementById("customSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (sidebar && overlay) {
        sidebar.classList.toggle("open");
        overlay.classList.toggle("active");
    }
};

// ৫. মূলui-data.js ও app.js এর অরিজিনাল ফাংশনগুলোকে ট্রিগার করা
window.triggerSection = function (sectionId) {
    const navButtons = document.querySelectorAll("header nav button");
    let found = false;

    navButtons.forEach(btn => {
        if (btn.getAttribute("onclick") && btn.getAttribute("onclick").includes(sectionId)) {
            btn.click();
            found = true;
        }
    });

    if (!found) {
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(sec => sec.classList.remove('active'));
        const targetSection = document.getElementById(sectionId);
        if (targetSection) targetSection.classList.add('active');
        if (typeof showSection === "function") showSection(sectionId);
    }

    // ব্যাক থাকলে শিক্ষা হাব মেইন ক্যাটাগরিতে ফেরত নেওয়া
    if (sectionId === 'studyHub' && typeof closeStudyFolder === 'function') {
        closeStudyFolder();
    }

    window.toggleNavSidebar();
};
