import admin from 'firebase-admin';

if (!admin.apps.length) {
    admin.initializeApp({
        projectId: "nur-microtech"
    });
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'অনুমতি ছাড়া প্রবেশ নিষেধ!' });
    }

    const token = authHeader.split('Bearer ')[1];

    try {
        await admin.auth().verifyIdToken(token);
        
        const projects = {
            "p1": {
                name: "IoT Smart Medicine Box",
                iframeUrl: "https://wokwi.com/projects/469244889301297153/embed"
            }
        };

        const projectId = req.query.id || "p1";
        
        if (projects[projectId]) {
            return res.status(200).json({ 
                success: true, 
                data: projects[projectId] 
            });
        } else {
            return res.status(404).json({ error: 'প্রজেক্ট পাওয়া যায়নি' });
        }

    } catch (error) {
        return res.status(403).json({ error: 'অবৈধ বা মেয়াদোত্তীর্ণ টোকেন!' });
    }
}
