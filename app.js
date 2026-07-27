// ──────────────────────────────────────────────────────────────────────────────
//  MathX Club — Main App Logic
//  Handles:
//    1. Rendering the member ID card directory   (index.html)
//    2. Generating QR codes for each card back   (index.html)
//    3. Rendering a member's profile card        (profile.html)
// ──────────────────────────────────────────────────────────────────────────────

// ─── Utilities ───────────────────────────────────────────────────────────────

/**
 * Builds the absolute URL for a member's profile page.
 * Works whether the site is hosted or opened locally via file://.
 */
function getProfileUrl(memberId) {
  const base = window.location.href.replace(/\/[^\/]*(\?.*)?$/, '/');
  return `${base}profile.html?id=${memberId}`;
}

/**
 * Darkens a hex colour by `amount` for gradient endpoints.
 */
function darkenHex(hex, amount = 40) {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, (num >> 16) - amount);
  const g = Math.max(0, ((num >> 8) & 0xff) - amount);
  const b = Math.max(0, (num & 0xff) - amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/**
 * Formats a member index as a zero-padded ID string: MX-001
 */
function formatMemberId(index) {
  return `MX-${String(index + 1).padStart(3, '0')}`;
}

// Helper to extract a clean username/handle from a full URL or path string
function extractHandle(value, domainKeyword) {
  if (!value.includes(domainKeyword)) {
    return value;
  }
  let urlString = value;
  if (!/^https?:\/\//i.test(urlString)) {
    urlString = 'https://' + urlString;
  }
  try {
    const url = new URL(urlString);
    let path = url.pathname.replace(/^\/+|\/+$/g, ''); // strip leading/trailing slashes
    
    if (domainKeyword === 'linkedin.com') {
      if (path.startsWith('in/')) {
        path = path.substring(3);
      }
    }
    
    // Split by slash and return the first segment as username (ignoring sub-directories or sub-pages)
    const parts = path.split('/');
    return parts[0] || '';
  } catch (e) {
    return value;
  }
}

// Helper to clean up handles/URLs and convert them to valid standard absolute URLs
function formatSocialUrl(type, value) {
  if (!value) return null;
  value = value.trim();
  
  // If the user included an @ (e.g. "@username"), strip it
  if (value.startsWith('@')) {
    value = value.substring(1);
  }
  
  let handle = value;
  
  switch (type) {
    case 'instagram':
      handle = extractHandle(value, 'instagram.com');
      return handle ? `https://instagram.com/${handle}` : null;
    case 'linkedin':
      handle = extractHandle(value, 'linkedin.com');
      return handle ? `https://linkedin.com/in/${handle}` : null;
    case 'github':
      handle = extractHandle(value, 'github.com');
      return handle ? `https://github.com/${handle}` : null;
    case 'twitter':
      if (value.includes('twitter.com')) {
        handle = extractHandle(value, 'twitter.com');
      } else if (value.includes('x.com')) {
        handle = extractHandle(value, 'x.com');
      }
      return handle ? `https://x.com/${handle}` : null;
    case 'whatsapp':
      let waValue = value;
      if (waValue.includes('wa.me')) {
        waValue = extractHandle(waValue, 'wa.me');
      }
      const cleanPhone = waValue.replace(/\D/g, '');
      return cleanPhone ? `https://wa.me/${cleanPhone}` : null;
    case 'email':
      const cleanEmail = value.replace(/^mailto:/i, '');
      return cleanEmail ? `mailto:${cleanEmail}` : null;
    default:
      return value;
  }
}

function buildSocialLinks(member) {
  const links = [
    {
      cls: 'social-instagram', icon: 'fa-brands fa-instagram', label: 'Instagram',
      url: formatSocialUrl('instagram', member.instagram),
    },
    {
      cls: 'social-linkedin', icon: 'fa-brands fa-linkedin-in', label: 'LinkedIn',
      url: formatSocialUrl('linkedin', member.linkedin),
    },
    {
      cls: 'social-github', icon: 'fa-brands fa-github', label: 'GitHub',
      url: formatSocialUrl('github', member.github),
    },
    {
      cls: 'social-twitter', icon: 'fa-brands fa-x-twitter', label: 'Twitter/X',
      url: formatSocialUrl('twitter', member.twitter),
    },
    {
      cls: 'social-whatsapp', icon: 'fa-brands fa-whatsapp', label: 'WhatsApp',
      url: formatSocialUrl('whatsapp', member.whatsapp),
    },
    {
      cls: 'social-email', icon: 'fa-solid fa-envelope', label: 'Email',
      url: formatSocialUrl('email', member.email),
    },
  ];
  return links.filter(l => l.url);
}

// ─── Directory Page — ID Card Grid ───────────────────────────────────────────

function renderDirectory() {
  const grid = document.getElementById('cardsGrid');
  if (!grid) return;

  MEMBERS.forEach((member, index) => {
    const profileUrl = getProfileUrl(member.id);
    const memberId = formatMemberId(index);
    const avatarGrad = `linear-gradient(135deg, ${member.avatarColor}, ${darkenHex(member.avatarColor, 55)})`;
    const dotColor = member.avatarColor;

    // ── Outer flip wrapper ──
    const wrap = document.createElement('div');
    wrap.className = 'id-card-wrap';
    wrap.setAttribute('title', `${member.name} — Click to flip`);

    wrap.innerHTML = `
      <div class="id-card">

        <!-- ═══════════ FRONT FACE ═══════════ -->
        <div class="id-face id-front">

          <!-- Header strip -->
          <div class="id-front-header">
            <div class="id-header-logo">∑</div>
            <span class="id-header-club">MathX</span>
            <span class="id-header-number">${memberId}</span>
          </div>

          <!-- Body: avatar + info -->
          <div class="id-front-body">
            <div class="id-avatar" style="background: ${avatarGrad};">
              ${member.initials}
            </div>
            <div class="id-info">
              <div class="id-member-name">${member.name}</div>
              <div class="id-designation">${member.designation}</div>
              <div class="id-dot-row">
                <div class="id-dot" style="background:${dotColor};"></div>
                <div class="id-dot" style="background:${dotColor};"></div>
                <div class="id-dot" style="background:${dotColor};"></div>
                <div class="id-dot" style="background:${dotColor};"></div>
              </div>
            </div>
          </div>

          <!-- Footer strip -->
          <div class="id-front-footer">
            <span class="id-footer-url">mathx.club</span>
            <span class="id-flip-hint">
              <i class="fa-solid fa-rotate"></i> Flip for QR
            </span>
          </div>
        </div>

        <!-- ═══════════ BACK FACE ═══════════ -->
        <div class="id-face id-back">
          <!-- Magnetic stripe decoration at top -->
          <div class="id-stripe"></div>

          <div class="id-back-content">
            <span class="id-back-label">Scan to Connect</span>
            <div class="id-qr-box" id="qr-${member.id}"></div>
            <span class="id-back-name">${member.name}</span>
            <span class="id-back-url">mathx.club</span>
          </div>
        </div>

      </div><!-- /.id-card -->
    `;

    // Click handler to flip the card
    wrap.addEventListener('click', () => wrap.classList.toggle('flipped'));

    grid.appendChild(wrap);

    // Generate QR code (defer so the DOM node is painted first)
    setTimeout(() => {
      const qrEl = document.getElementById(`qr-${member.id}`);
      if (!qrEl) return;
      new QRCode(qrEl, {
        text: profileUrl,
        width: 112,
        height: 112,
        colorDark: '#180840',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      });
    }, 0);
  });
}

// ─── Profile Page ─────────────────────────────────────────────────────────────

function renderProfile() {
  const container = document.getElementById('profileContainer');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const memberId = params.get('id');
  const member = MEMBERS.find(m => m.id === memberId);

  // ── Not Found ──
  if (!member) {
    container.innerHTML = `
      <div class="not-found">
        <div class="nf-icon">🔍</div>
        <h2>Member Not Found</h2>
        <p>We couldn't find a member with the ID <strong>"${memberId || 'unknown'}"</strong>.<br>
           Please scan a valid MathX QR code.</p>
        <a href="index.html">
          <i class="fa-solid fa-arrow-left"></i> Back to Directory
        </a>
      </div>
    `;
    document.title = 'MathX — Not Found';
    return;
  }

  // ── Build Social Buttons ──
  const socials = buildSocialLinks(member);
  const socialHTML = socials.map(s => `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer"
       class="social-btn ${s.cls}" aria-label="${s.label}">
      <i class="${s.icon}"></i>${s.label}
    </a>
  `).join('');

  const avatarGrad = `linear-gradient(135deg, ${member.avatarColor}, ${darkenHex(member.avatarColor, 55)})`;

  // ── Render Profile Card ──
  container.innerHTML = `
    <div class="profile-card">
      <a href="index.html" class="back-btn" title="Back to Directory" aria-label="Back">
        <i class="fa-solid fa-arrow-left"></i>
      </a>
      <span class="club-badge">MathX</span>

      <div class="profile-avatar" style="background: ${avatarGrad};">
        ${member.initials}
      </div>

      <h1 class="profile-name">${member.name}</h1>
      <span class="profile-designation">${member.designation}</span>

      <p class="profile-bio">${member.bio || ''}</p>

      <div class="divider"></div>

      <div class="social-grid">
        ${socialHTML || '<p style="color:var(--text-muted);font-size:0.85rem;">No social links available.</p>'}
      </div>
    </div>
  `;

  document.title = `${member.name} — MathX`;
}

// ─── Bootstrap ────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderDirectory(); // index.html — renders ID card grid + QR codes
  renderProfile();   // profile.html — renders individual profile card
});
