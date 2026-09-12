// Single place to update your Selar store/product link.
const STORE_LINK = "https://shopify.selar.com";

const PRODUCTS = [
  { badge: "Best Seller", category: "AI Tools", icon: "🤖", tint: "teal", title: "ChatGPT Mastery Toolkit", desc: "Complete prompt library + workflow automation for ChatGPT power users" },
  { badge: "Hot", category: "Marketing", icon: "📱", tint: "purple", title: "TikTok Monetization Blueprint", desc: "Step-by-step system to earn $1,000+/month from TikTok using AI content" },
  { badge: "Best Seller", category: "Marketing", icon: "📸", tint: "maroon", title: "Instagram AI Growth System", desc: "AI-powered content calendar, caption generator, and hashtag strategy" },
  { badge: "Hot", category: "Templates", icon: "📧", tint: "green", title: "Email Marketing Templates Pack", desc: "500+ proven email templates for every niche and campaign type" },
  { badge: "Best Seller", category: "Courses", icon: "⚡", tint: "indigo", title: "Side Hustle Starter Kit", desc: "Everything you need to launch your first AI-powered income stream in 7 days" },
  { badge: "Hot", category: "Courses", icon: "🎯", tint: "amber", title: "Digital Product Launch Playbook", desc: "Complete A-Z system to create, launch, and sell your first digital product" },
  { badge: "", category: "Software", icon: "💼", tint: "navy", title: "Microsoft Office Pro Bundle", desc: "Full suite of Microsoft productivity tools and templates" },
  { badge: "", category: "AI Tools", icon: "🚀", tint: "rust", title: "Reddit AI Traffic Machine", desc: "Use AI to drive massive organic traffic from Reddit communities" },
  { badge: "", category: "AI Tools", icon: "📚", tint: "teal", title: "Wikipedia Content Strategy", desc: "Leverage Wikipedia for SEO, research, and AI-powered content creation" },
  { badge: "", category: "Courses", icon: "🎨", tint: "maroon", title: "Canva AI Design Mastery", desc: "Create stunning digital products and social media content with Canva + AI" },
  { badge: "", category: "AI Tools", icon: "⚙️", tint: "navy", title: "ChatGPT for Business Automation", desc: "Automate your entire business workflow using ChatGPT prompts and integrations" },
  { badge: "", category: "Templates", icon: "📅", tint: "purple", title: "TikTok AI Content Calendar", desc: "30-day AI-generated TikTok content plan with hooks, scripts, and captions" },
];

const grid = document.getElementById("products");
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

let activeFilter = "All";
let query = "";

function render() {
  const filtered = PRODUCTS.filter((p) => {
    const matchesFilter = activeFilter === "All" || p.category === activeFilter;
    const matchesQuery = p.title.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
    return matchesFilter && matchesQuery;
  });

  grid.innerHTML = filtered
    .map(
      (p) => `
      <article class="card tint-${p.tint}">
        <div class="card-media">
          <span class="icon">${p.icon}</span>
          ${p.badge ? `<span class="badge">${p.badge === "Best Seller" ? "⭐" : "🔥"} ${p.badge}</span>` : ""}
        </div>
        <div class="card-body">
          <p class="category">${p.category}</p>
          <h3>${p.title}</h3>
          <p class="desc">${p.desc}</p>
          <div class="card-footer">
            <span class="access">⚡ Instant access</span>
            <a class="buy-btn" href="${STORE_LINK}" target="_blank" rel="noopener">Buy Now</a>
          </div>
        </div>
      </article>`
    )
    .join("");

  resultCount.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? "" : "s"}`;
  noResults.hidden = filtered.length !== 0;
}

searchInput.addEventListener("input", (e) => {
  query = e.target.value.trim().toLowerCase();
  render();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    activeFilter = btn.dataset.filter;
    render();
  });
});

document.getElementById("storeLinkTop").href = STORE_LINK;

// Share links for spreading the word on social platforms.
const shareText = encodeURIComponent(
  "Check out these AI-powered digital products — tools, courses & templates to help you turn AI into income:"
);
const shareUrl = encodeURIComponent(STORE_LINK);

document.getElementById("shareTwitter").href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
document.getElementById("shareFacebook").href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
document.getElementById("shareWhatsapp").href = `https://wa.me/?text=${shareText}%20${shareUrl}`;

// Lead capture — submits to Netlify Forms without a page reload.
const leadForm = document.getElementById("leadForm");
const leadStatus = document.getElementById("leadStatus");

leadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(leadForm);
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    });
    if (response.ok) {
      leadStatus.textContent = "You're on the list! We'll email you about new drops and discounts.";
      leadForm.reset();
    } else {
      leadStatus.textContent = "Something went wrong. Please try again.";
    }
  } catch {
    leadStatus.textContent = "Something went wrong. Please try again.";
  }
});

document.getElementById("copyLink").addEventListener("click", async (e) => {
  const btn = e.currentTarget;
  try {
    await navigator.clipboard.writeText(STORE_LINK);
    const original = btn.textContent;
    btn.textContent = "Copied!";
    setTimeout(() => (btn.textContent = original), 1500);
  } catch {
    // Clipboard API unavailable — fall back silently, link is still visible in the address bar of the share buttons.
  }
});

render();
