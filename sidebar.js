document.addEventListener("DOMContentLoaded", function () {
    // ১. সাইডবার ও ৩-বার আইকনের ডায়নামিক সিএসএস
    const sidebarStyle = document.createElement("style");
    sidebarStyle.innerHTML = `
        /* হেডার পজিশন অ্যাডজাস্টমেন্ট */
        header { 
            position: relative; 
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        /* মূল হেডারের অরিজিনাল নেভিগেশন লুকিয়ে ফেলা */
        header nav { 
            display: none !important; 
        }

        /* ৩ bar আইকন স্টাইল */
        .menu-toggle-btn {
            position: absolute;
            left: 20px;
            top: 25px;
            font-size: 22px;
            cursor: pointer;
            color: white;
            background: #334155;
            padding: 8px 14px;
            border-radius: 8px;
            transition: 0.3s;
            z-index: 100;
        }
        .menu-toggle-btn:hover { background: #2563eb; }

        /* সাইডবার ড্রয়ার স্টাইল */
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

        /* সাইডবার লিঙ্ক স্টাইল */
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

        /* ওভারলে (ঝাপসা ব্যাকগ্রাউন্ড) */
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

    // ২. ৩-বার বোতামটি অটোমেটিক হেডারে যোগ করা
    const header = document.querySelector("header");
    if (header) {
        const toggleBtn = document.createElement("div");
        toggleBtn.className = "menu-toggle-btn";
        toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        toggleBtn.onclick = toggleNavSidebar;
        header.insertBefore(toggleBtn, header.firstChild);
    }

    // ৩. সাইডবার এবং ওভারলে রেন্ডার করা
    const sidebarHTML = `
        <div id="customSidebar" class="custom-sidebar">
            <div class="sidebar-close-btn" onclick="toggleNavSidebar()"><i class="fa-solid fa-xmark"></i></div>
            <a href="#" onclick="triggerSection('home')">🏠 হোম</a>
            <a href="#" onclick="triggerSection('about')">👨‍💻 আমার সম্পর্কে</a>
            <a href="#" onclick="triggerSection('projects')">🤖 প্রজেক্টসমূহ</a>
            <a href="#" onclick="triggerSection('studyHub')">📚 জ্ঞান ও শিক্ষা হাব</a>
            <a href="#" onclick="triggerSection('plans')">🚀 ভবিষ্যৎ প্ল্যান</a>
            <a href="#" onclick="triggerSection('gallery')">📸 গ্যালারি</a>
            <a href="#" onclick="triggerSection('contact')">📲 যোগাযোগ</a>
        </div>
        <div id="sidebarOverlay" class="sidebar-overlay" onclick="toggleNavSidebar()"></div>
    `;
    document.body.insertAdjacentHTML("beforeend", sidebarHTML);
});

// ৪. সাইডবার টগল ফাংশন
window.toggleNavSidebar = function () {
    const sidebar = document.getElementById("customSidebar");
    const overlay = document.getElementById("sidebarOverlay");
    if (sidebar && overlay) {
        sidebar.classList.toggle("open");
        overlay.classList.toggle("active");
    }
};

// ৫. সেকশন পরিবর্তন ও সাইডবার অটো ক্লজ লজিক
window.triggerSection = function (sectionId) {
    if (typeof showSection === "function") {
        showSection(sectionId);
    }
    toggleNavSidebar();
};
