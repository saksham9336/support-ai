(function () {

    const api_Url = `${document.currentScript.src.split('/chatBot.js')[0]}/api/chat`

    const scriptTag = document.currentScript;
    const ownerId = scriptTag.getAttribute("data-owner-id")

    if (!ownerId) {
        console.log("owner id not found")
        return
    }

    const button = document.createElement("div")
    button.innerHTML = "🗨️"
    Object.assign(button.style, {
        position: "fixed", bottom: "24px", right: "24px",
        width: "56px", height: "56px", borderRadius: "50%",
        background: "#000", color: "#fff", display: "flex",
        alignItems: "center", justifyContent: "center",
        cursor: "pointer", fontSize: "22px",
        boxShadow: "0 15px 40px rgba(0,0,0,0.35)",
        zIndex: "999999", transition: "transform 0.2s",
    })
    button.onmouseenter = () => button.style.transform = "scale(1.1)"
    button.onmouseleave = () => button.style.transform = "scale(1)"
    document.body.appendChild(button)

    const box = document.createElement("div")
    Object.assign(box.style, {
        position: "fixed", bottom: "90px", right: "24px",
        width: "340px", height: "480px", background: "#fff",
        borderRadius: "16px", boxShadow: "0 25px 60px rgba(0,0,0,0.25)",
        display: "none", flexDirection: "column", overflow: "hidden",
        zIndex: "999999", fontFamily: "Inter, system-ui, sans-serif",
    })

    box.innerHTML = `
    <style>
      @keyframes blink { 0%,80%,100%{opacity:0} 40%{opacity:1} }
      .typing-dot { display:inline-block; width:6px; height:6px; margin:0 2px; border-radius:50%; background:#6b7280; animation:blink 1.2s infinite; }
      .typing-dot:nth-child(2){animation-delay:0.2s}
      .typing-dot:nth-child(3){animation-delay:0.4s}
      #voice-btn.recording{background:#ef4444!important}
    </style>
    <div style="background:#000;color:#fff;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;">
      <div style="display:flex;align-items:center;gap:8px;">
        <div style="width:8px;height:8px;border-radius:50%;background:#22c55e;"></div>
        <span style="font-size:14px;font-weight:600;">Customer Support</span>
      </div>
      <span id="chat-close" style="cursor:pointer;font-size:18px;">✕</span>
    </div>
    <div id="chat-messages" style="flex:1;padding:14px;overflow-y:auto;background:#f9fafb;display:flex;flex-direction:column;gap:8px;"></div>
    <div id="voice-status" style="text-align:center;font-size:12px;color:#6b7280;padding:4px 0;display:none;background:#f9fafb;">🎤 Listening...</div>
    <div style="display:flex;border-top:1px solid #e5e7eb;padding:10px;gap:8px;align-items:center;background:#fff;">
      <button id="voice-btn" style="width:36px;height:36px;border:none;background:#f3f4f6;border-radius:50%;font-size:16px;cursor:pointer;flex-shrink:0;">🎤</button>
      <input id="chat-input" type="text" style="flex:1;padding:9px 12px;border:1.5px solid #d1d5db;border-radius:10px;font-size:13px;" placeholder="Type a message…"/>
      <button id="chat-send" style="padding:9px 14px;border:none;background:#000;color:#fff;border-radius:10px;font-size:13px;cursor:pointer;">Send</button>
    </div>`

    document.body.appendChild(box)

    button.onclick = () => {
        const isHidden = box.style.display === "none"
        box.style.display = isHidden ? "flex" : "none"
        if (isHidden && messageArea.children.length === 0) addMessage("👋 Hi! How can I help you today?", "ai")
    }
    document.querySelector("#chat-close").onclick = () => box.style.display = "none"

    const input = document.querySelector("#chat-input")
    const sendBtn = document.querySelector("#chat-send")
    const messageArea = document.querySelector("#chat-messages")
    const voiceBtn = document.querySelector("#voice-btn")
    const voiceStatus = document.querySelector("#voice-status")

    function addMessage(text, from) {
        const bubble = document.createElement("div")
        bubble.textContent = text
        Object.assign(bubble.style, {
            maxWidth: "80%", padding: "10px 14px", borderRadius: "16px",
            fontSize: "13px", lineHeight: "1.5",
            alignSelf: from === "user" ? "flex-end" : "flex-start",
            background: from === "user" ? "#000" : "#e5e7eb",
            color: from === "user" ? "#fff" : "#111",
            wordBreak: "break-word",
        })
        messageArea.appendChild(bubble)
        messageArea.scrollTop = messageArea.scrollHeight
        return bubble
    }

    function showTyping() {
        const t = document.createElement("div")
        t.id = "typing-indicator"
        t.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`
        Object.assign(t.style, { display:"flex", alignItems:"center", gap:"2px", padding:"10px 14px", borderRadius:"16px", background:"#e5e7eb", alignSelf:"flex-start" })
        messageArea.appendChild(t)
        messageArea.scrollTop = messageArea.scrollHeight
        return t
    }

    async function sendMessage(text) {
        if (!text.trim()) return
        addMessage(text, "user")
        input.value = ""
        sendBtn.disabled = true
        sendBtn.textContent = "..."
        const typing = showTyping()
        try {
            const res = await fetch(api_Url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ownerId, message: text })
            })
            const data = await res.json()
            messageArea.removeChild(typing)
            const replyText = typeof data === "string" ? data : (data.message || "Something went wrong")
            const bubble = addMessage("", "ai")
            let i = 0
            const interval = setInterval(() => {
                bubble.textContent += replyText[i] || ""
                i++
                messageArea.scrollTop = messageArea.scrollHeight
                if (i >= replyText.length) { clearInterval(interval); speakText(replyText) }
            }, 18)
        } catch (e) {
            messageArea.removeChild(typing)
            addMessage("❌ Something went wrong.", "ai")
        }
        sendBtn.disabled = false
        sendBtn.textContent = "Send"
    }

    sendBtn.onclick = () => sendMessage(input.value.trim())
    input.onkeydown = (e) => { if (e.key === "Enter") sendMessage(input.value.trim()) }

    let recognition = null, isRecording = false
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SR) {
        recognition = new SR()
        recognition.lang = "en-US"
        recognition.interimResults = false
        recognition.onresult = (e) => { const t = e.results[0][0].transcript; input.value = t; stopRec(); sendMessage(t) }
        recognition.onerror = (e) => { stopRec(); if (e.error === "not-allowed") addMessage("❌ Mic permission denied.", "ai") }
        recognition.onend = () => stopRec()
        voiceBtn.onclick = () => { if (isRecording) { recognition.stop(); stopRec() } else { startRec(); recognition.start() } }
    } else {
        voiceBtn.style.opacity = "0.4"
        voiceBtn.style.cursor = "not-allowed"
    }

    function startRec() { isRecording = true; voiceBtn.classList.add("recording"); voiceBtn.innerHTML = "⏹"; voiceStatus.style.display = "block" }
    function stopRec() { isRecording = false; voiceBtn.classList.remove("recording"); voiceBtn.innerHTML = "🎤"; voiceStatus.style.display = "none" }
    function speakText(text) {
        if (!window.speechSynthesis) return
        window.speechSynthesis.cancel()
        const u = new SpeechSynthesisUtterance(text)
        u.lang = "en-US"; u.rate = 1; u.pitch = 1
        window.speechSynthesis.speak(u)
    }
})()