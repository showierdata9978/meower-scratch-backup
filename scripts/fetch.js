import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CACHE_TIMEOUT = 500; // milliseconds
const cache = new Map();

const getUserIdByUsername = async (username) => {
    if (cache.has(username)) {
        const cachedData = cache.get(username);
        if (Date.now() - cachedData.timestamp < CACHE_TIMEOUT) {
            return cachedData.userId;
        }
    }

    const url = `https://trampoline.turbowarp.org/proxy/users/${username}/`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
        const userId = data.id;
        cache.set(username, { userId, timestamp: Date.now() });
        return userId;
    } else {
    }
};

const fetchAndSaveProfilePictures = async (dumpFilePath) => {
    const dumpFile = path.join(__dirname, dumpFilePath);
    const pfpsDirectory = path.join(__dirname, '../', 'public', 'pfps');

    try {
        // Read the dump file
        const data = fs.readFileSync(dumpFile, 'utf8');
        const posts = JSON.parse(data);

        // Create the pfps directory if it doesn't exist
        if (!fs.existsSync(pfpsDirectory)) {
            fs.mkdirSync(pfpsDirectory, { recursive: true });
        }

        // Iterate over each post and fetch the profile picture if it doesn't exist
        for (const post of posts) {
            const userId = await getUserIdByUsername(post.username);
			if (!userId) {
				console.error(`Failed to fetch user ID for username ${post.username}`);
				continue;
			}
            const filePath = path.join(pfpsDirectory, `${post.username}.png`);

            // Check if the image file already exists
            if (fs.existsSync(filePath)) {
                console.log(`Profile picture for username ${post.username} already exists.`);
                continue;
            }

            const url = `https://cdn2.scratch.mit.edu/get_image/user/${userId}_60x60.png`;

            const response = await fetch(url);

            if (!response.ok) {
                console.error(`Failed to fetch profile picture for username ${post.username}. Status: ${response.status}`);
                continue;
            }

            const buffer = await response.arrayBuffer();
            fs.writeFileSync(filePath, Buffer.from(buffer));
            console.log(`Profile picture saved for username ${post.username}`);
        }

        console.log('All profile pictures fetched and saved successfully.');
    } catch (error) {
        console.error('Error fetching or saving profile pictures:', error);
    }
};

// Example usage
fetchAndSaveProfilePictures('src/assets/dump.json');