// ১. সোশ্যাল মিডিয়া লিঙ্কসমূহ ও শিক্ষা হাবের কন্টেন্ট render করা
document.addEventListener("DOMContentLoaded", function () {
    
    // সোশ্যাল মিডিয়া বাটন
    const socialLinksHTML = `
        <a href="https://www.facebook.com/musafir.nurm514" target="_blank" class="btn-social btn-facebook">📘 Facebook</a>
        <a href="https://twitter.com" target="_blank" class="btn-social btn-twitter">🐦 Twitter (X)</a>
        <a href="https://www.instagram.com" target="_blank" class="btn-social btn-instagram">📸 Instagram</a>
        <a href="https://www.linkedin.com" target="_blank" class="btn-social btn-linkedin">💼 LinkedIn</a>
    `;
    const socialContainer = document.getElementById("socialLinksContainer");
    if (socialContainer) socialContainer.innerHTML = socialLinksHTML;

    // ২. শিক্ষা হাবের ডাইনামিক ভিউসমূহ (অরিজিনাল নোটিশ ও মতামত অপশনসহ)
    const studyViewsHTML = `
        <!-- একাডেমি ক্লাস তালিকা -->
        <div id="academicView" style="display: none; margin-top: 15px;">
            <button class="back-btn" onclick="backToHubMain()">🔙 মূল ক্যাটাগরিতে ফিরুন</button>
            <h3>🏫 একাডেমি ক্লাস বেছে নিন</h3>
            <div class="grid-container" id="classListGrid"></div>
        </div>

        <!-- ক্লাসের ভেতরের ডিটেইলস -->
        <div id="classDetailView" style="display: none; margin-top: 15px;">
            <button class="back-btn" onclick="backToAcademic()">🔙 ক্লাস তালিকায় ফিরুন</button>
            <h3 id="selectedClassTitle"></h3>
            
            <!-- আপনার অরিজিনাল বিশেষ বার্তা নোটিশ + লাইক + মতামত পাঠাবার বক্স -->
            <div id="writerNoticeBox" class="author-notice-box" style="display: block; margin-top: 15px; background: #eff6ff; border-left: 5px solid #2563eb; padding: 15px; border-radius: 8px;">
                📢 <strong>বিশেষ বার্তা:</strong> যেসব রাইটারের বই এখানে রাখা হয়েছে, এই বিষয়ে যদি আপনাদের কোনো ব্যক্তিগত মতামত থাকে তবে দয়া করে জানাবেন। যদি আমার এই উদ্যোগটি ভালো লেগে থাকে তবে একটি লাইক দিন। আর যদি লেখক/প্রকাশক বা সংশ্লিষ্ট কারো কাছে এই বিষয়টি অসন্তোষজনক মনে হয়, তবে দয়া করে আমার সাথে যোগাযোগ করে নিষেধ করবেন, আমি সাথে সাথে বইটি সরিয়ে দেবো। এটি কোনো বাণিজ্যিক উদ্দেশ্যে নয়, সম্পূর্ণ শিক্ষার্থীদের সহায়তার উদ্দেশ্যে করা হয়েছে। ধন্যবাদ।
                
                <div class="like-container" style="margin-top: 10px; display: flex; align-items: center; gap: 10px;">
                    <button class="btn-like" onclick="addLike()" style="background: #2563eb; color: white; border: none; padding: 6px 12px; border-radius: 20px; cursor: pointer; font-weight: bold;">👍 Like</button>
                    <span id="likeCountText" style="font-weight: bold; color: #1e293b;">0 Likes</span>
                </div>

                <!-- আপনার চাহিদামতো নতুন মতামত দেওয়ার অপশন -->
                <div class="feedback-area-box" style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed #bfdbfe;">
                    <strong>💬 আপনার মন্তব্য বা অনুরোধ লিখুন:</strong>
                    <textarea id="userFeedback" class="feedback-area" style="width: 100%; padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; margin-top: 8px; font-size: 13px;" placeholder="বই সম্পর্কে আপনার মতামত বা পরামর্শ লিখুন..."></textarea>
                    <button class="btn-feedback" onclick="submitFeedback()" style="background-color: #0284c7; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-weight: bold; margin-top: 6px; cursor: pointer;">মতামত পাঠান</button>
                    <div id="feedbackSuccess" style="color: #16a34a; font-size: 13px; font-weight: bold; margin-top: 5px; display: none;">আপনার মতামত জমা নেওয়া হয়েছে! ধন্যবাদ।</div>
                </div>
            </div>

            <div class="resource-box" style="margin-top: 15px;">
                <h4>📄 বোর্ড ও রেফারেন্স বই</h4>
                <ul class="book-list" id="boardBooksContainer"></ul>
            </div>
            <div class="resource-box" style="margin-top: 15px;">
                <h4>📖 গাইড ও নোটস (Guide Books & Notes)</h4>
                <p>অধ্যায়ভিত্তিক গাইড ও হ্যান্ডনোটস শীঘ্রই আপলোড করা হবে...</p>
            </div>
            <div class="resource-box" style="margin-top: 15px;">
                <h4>🎥 ভিডিও ক্লাসেস (Class Records)</h4>
                <p>অধ্যায়ভিত্তিক ক্লাস ভিডিও রেকর্ডস খুব শীঘ্রই যুক্ত হবে...</p>
            </div>
        </div>

        <!-- অন্যান্য ক্যাটাগরি -->
        <div id="ieltsView" style="display: none; margin-top: 15px;">
            <button class="back-btn" onclick="backToHubMain()">🔙 মূল ক্যাটাগরিতে ফিরুন</button>
            <h3>🇬🇧 IELTS Preparation Hub</h3>
            <div class="resource-box">
                <h4>📚 Cambridge Books & Materials</h4>
                <p>পিডিএফ বই ও লিসেনিং অডিও ফাইলসমূহ...</p>
            </div>
        </div>

        <div id="islamicView" style="display: none; margin-top: 15px;">
            <button class="back-btn" onclick="backToHubMain()">🔙 মূল ক্যাটাগরিতে ফিরুন</button>
            <h3>🕌 ইসলামিক বই ও তাফসীর</h3>
            <div class="resource-box">
                <h4>📖 তাফসীর ও হাদিস গ্রন্থ</h4>
                <p>সংগৃহীত ইসলামিক পিডিএফ বইসমূহ...</p>
            </div>
        </div>

        <div id="literatureView" style="display: none; margin-top: 15px;">
            <button class="back-btn" onclick="backToHubMain()">🔙 মূল ক্যাটাগরিতে ফিরুন</button>
            <h3>📖 সাহিত্য ও অন্যান্য উপন্যাস</h3>
            <div class="resource-box">
                <h4>🖋️ গল্প ও সাহিত্য সম্ভার</h4>
                <p>দেশি-বিদেশি বিখ্যাত উপন্যাস ও কবিতার বই...</p>
            </div>
        </div>
    `;
    
    const studyContainer = document.getElementById("studyHubViews");
    if (studyContainer) studyContainer.innerHTML = studyViewsHTML;

    // লাইক সংখ্যা লোড করা
    loadLikes();
});

// লাইক ও ফিডব্যাক সংক্রান্ত ফাংশনসমূহ
let likesCount = parseInt(localStorage.getItem('writerNoticeLikes') || '0');

function loadLikes() {
    const text = document.getElementById('likeCountText');
    if (text) text.innerText = likesCount + " Likes";
}

window.addLike = function() {
    likesCount++;
    localStorage.setItem('writerNoticeLikes', likesCount);
    loadLikes();
};

window.submitFeedback = function() {
    const input = document.getElementById("userFeedback");
    const msg = document.getElementById("feedbackSuccess");
    if (input && input.value.trim() !== "") {
        let feedbacks = JSON.parse(localStorage.getItem("siteFeedbacks") || "[]");
        feedbacks.push(input.value);
        localStorage.setItem("siteFeedbacks", JSON.stringify(feedbacks));
        input.value = "";
        if (msg) {
            msg.style.display = "block";
            setTimeout(() => { msg.style.display = "none"; }, 3000);
        }
    }
};
