<?php
// ==============================================================================
// 1. TIMEOUT PREVENTION, ERROR HANDLING & DB INITIALIZATION
// ==============================================================================
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$host     = "137.220.58.223";
$username = "root";
$password = "newstartbuss01@";
$database = "EVOLUTRA_EVENT_DB";

$conn = new mysqli($host, $username, $password, $database);
if ($conn->connect_error) {
    die("Profile Engine Error: Connection down. " . $conn->connect_error);
}

// Extract the targeted string parameter from the URL footprint (?id=EV_037)
$target_id = isset($_GET['id']) ? trim($_GET['id']) : '';

if (empty($target_id)) {
    die("<div style='font-family:Arial; padding:40px; text-align:center;'><h3>Operational Error</h3><p>No valid Employee Identifier specified in request parameters.</p></div>");
}

// ==============================================================================
// 2. EXTENDED DATA EXTRACTION & CLEANING LAYER
// ==============================================================================
$query = "SELECT first_name, last_name, email, employee_id, contact, designation, blood_group, emergency_contact, address, linkedin FROM ev_users WHERE employee_id = ? LIMIT 1";
$stmt = $conn->prepare($query);

if (!$stmt) {
    die("Database Preparation Error: " . $conn->error);
}

$stmt->bind_param("s", $target_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    die("<div style='font-family:Arial; padding:40px; text-align:center;'><h3>Access Error</h3><p>The profile footprint matching ID '" . htmlspecialchars($target_id) . "' does not exist.</p></div>");
}

$user = $result->fetch_assoc();
$stmt->close();
$conn->close();

// Sanitize local variable extractions
$first_name  = htmlspecialchars($user['first_name']);
$last_name   = htmlspecialchars($user['last_name']);
$full_name   = $first_name . ' ' . $last_name;
$emp_id      = htmlspecialchars($user['employee_id']);
$designation = htmlspecialchars($user['designation'] ?? 'Software Engineer');
$blood_group = htmlspecialchars($user['blood_group'] ?? '—');
$email       = htmlspecialchars($user['email'] ?? '—');
$team        = htmlspecialchars($user['team_id'] ?? 'Core Operations');
$address     = htmlspecialchars($user['address'] ?? '—');
$linkedin    = htmlspecialchars($user['linkedin'] ?? '—');

// Clean country code prefixes (+91 / 91) out of primary phone line
$raw_contact = trim($user['contact'] ?? '');
if (substr($raw_contact, 0, 3) === '+91') {
    $raw_contact = substr($raw_contact, 3);
} elseif (substr($raw_contact, 0, 2) === '91' && strlen($raw_contact) > 10) {
    $raw_contact = substr($raw_contact, 2);
}
$contact = htmlspecialchars(trim($raw_contact));
if (empty($contact)) { $contact = '—'; }

// Clean country code prefixes (+91 / 91) out of emergency phone line
$raw_emergency = trim($user['emergency_contact'] ?? '');
if (substr($raw_emergency, 0, 3) === '+91') {
    $raw_emergency = substr($raw_emergency, 3);
} elseif (substr($raw_emergency, 0, 2) === '91' && strlen($raw_emergency) > 10) {
    $raw_emergency = substr($raw_emergency, 2);
}
$emergency_contact = htmlspecialchars(trim($raw_emergency));
if (empty($emergency_contact)) { $emergency_contact = '—'; }

// Parse user profile photo with automated cache busting or default fallback mapping
$photoFolder = 'profileImg/';
$photoFile   = $emp_id . '.jpg';
$fullPhotoPath = __DIR__ . '/' . $photoFolder . $photoFile;

$hasValidImage = false;
$resolvedImgSrc = '';

if (file_exists($fullPhotoPath) && is_file($fullPhotoPath)) {
    $hasValidImage = true;
    $resolvedImgSrc = $photoFolder . $photoFile . '?v=' . filemtime($fullPhotoPath);
} else {
    $userInitials = strtoupper(substr($first_name, 0, 1) . substr($last_name, 0, 1));
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $full_name; ?> — Corporate Showdeck</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">

    <style>
        :root {
            --bg-canvas: #f4f6f9;
            --surface: #ffffff;
            --border: #e2e8f0;
            --text-main: #0f172a;
            --text-sub: #475569;
            --text-muted: #94a3b8;
            
            /* Accurate Color Palette Extraction Tokens Matching Reference Mockup Exactly */
            --brand-green-dark: #022c22;
            --brand-green-mid: #064e3b;
            --brand-gold-solid: #eab308;
            --brand-gold-light: #fef08a;
            --brand-gold-gradient: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);

            --radius-lg: 24px;
            --radius-md: 8px;
            --font-display: 'Sora', sans-serif;
            --font-body: 'DM Sans', sans-serif;
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
            background-color: var(--bg-canvas);
            font-family: var(--font-body);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 40px 20px;
        }

        /* Wide Dashboard Deck Container */
        .showcase-deck {
            background: var(--surface);
            width: 100%;
            max-width: 680px;
            border-radius: var(--radius-lg);
            border: 1px solid var(--border);
            box-shadow: 0 25px 30px -5px rgba(15,23,42,0.06), 0 10px 15px -5px rgba(15,23,42,0.04);
            overflow: visible;
            position: relative;
        }

        /* REWRITTEN: Complete Pixel-Accurate Graphic Pattern Header Module Engine */
        .deck-header-graphics {
            width: 100%;
            height: 310px;
            position: relative;
            background-color: var(--brand-green-dark);
            border-top-left-radius: var(--radius-lg);
            border-top-right-radius: var(--radius-lg);
            overflow: hidden;
            flex-shrink: 0;
        }

        /* Vertical Center Stripe Layout Path */
        .pattern-center-stripe {
            position: absolute;
            width: 140px;
            height: 100%;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(90deg, #ca8a04 0%, var(--brand-gold-solid) 50%, #ca8a04 100%);
            z-index: 1;
        }
        .pattern-center-stripe::before {
            content: '';
            position: absolute;
            inset: 0 20px;
            background-color: var(--brand-green-mid);
        }

        /* Left Side Intersecting Chevron Ribbon Flow */
        .pattern-wing-left-outer {
            position: absolute;
            width: 160px;
            height: 100%;
            left: -40px;
            top: 0;
            background-color: var(--brand-gold-solid);
            transform: skewX(-25deg);
            z-index: 2;
        }
        .pattern-wing-left-inner {
            position: absolute;
            width: 120px;
            height: 140%;
            left: 60px;
            top: -20%;
            background-color: var(--brand-green-mid);
            transform: rotate(-30deg);
            z-index: 3;
            box-shadow: -5px 0 15px rgba(0,0,0,0.15);
        }
        .pattern-wing-left-gold-trim {
            position: absolute;
            width: 50px;
            height: 100%;
            left: 140px;
            top: 0;
            background-color: var(--brand-gold-solid);
            transform: skewX(25deg);
            z-index: 2;
        }

        /* Right Side Intersecting Chevron Ribbon Flow */
        .pattern-wing-right-outer {
            position: absolute;
            width: 160px;
            height: 100%;
            right: -40px;
            top: 0;
            background-color: var(--brand-gold-solid);
            transform: skewX(25deg);
            z-index: 2;
        }
        .pattern-wing-right-inner {
            position: absolute;
            width: 120px;
            height: 140%;
            right: 60px;
            top: -20%;
            background-color: var(--brand-green-mid);
            transform: rotate(30deg);
            z-index: 3;
            box-shadow: 5px 0 15px rgba(0,0,0,0.15);
        }
        .pattern-wing-right-gold-trim {
            position: absolute;
            width: 50px;
            height: 100%;
            right: 140px;
            top: 0;
            background-color: var(--brand-gold-solid);
            transform: skewX(-25deg);
            z-index: 2;
        }

        /* Top-Hanging White Brand Logo Shield */
        .brand-shield-deck {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 180px;
            height: 140px;
            background: #ffffff;
            border-bottom-left-radius: 28px;
            border-bottom-right-radius: 28px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.08);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding-top: 10px;
            z-index: 10;
        }
        
        /* 3D sphere gradient sphere icon matching reference asset image exactly */
        .logo-spherical-icon {
            width: 54px;
            height: 54px;
            background: radial-gradient(circle at 65% 35%, #fde047 0%, var(--brand-gold-solid) 20%, var(--brand-green-mid) 70%, var(--brand-green-dark) 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-family: var(--font-display);
            font-size: 1.85rem;
            font-weight: 800;
            box-shadow: 0 4px 12px rgba(4,47,38,0.35);
            padding-right: 2px;
        }
        
        /* Two-tone color configuration split for brand header typography text */
        .logo-brand-headline {
            font-family: var(--font-display);
            font-size: 1.65rem;
            font-weight: 800;
            letter-spacing: -0.75px;
            margin-top: 6px;
            line-height: 1;
        }
        .logo-brand-headline .token-evo { color: var(--brand-gold-solid); }
        .logo-brand-headline .token-lutra { color: #042f24; }

        /* FIXED: Profile Avatar Anchor shifted down slightly to guarantee an unclipped full circle layout presentation */
        .profile-avatar-anchor {
            position: absolute;
            top: 235px; 
            left: 50%;
            transform: translateX(-50%);
            z-index: 50;
        }
        .portrait-circle-ring {
            width: 146px;
            height: 146px;
            border-radius: 50%;
            background: #ffffff;
            padding: 5px;
            box-shadow: 0 12px 28px rgba(15, 23, 42, 0.16);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .portrait-circle-ring::after {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 4px solid var(--brand-gold-solid);
            pointer-events: none;
        }
        .portrait-image-asset {
            width: 100%;
            height: 100%;
            border-radius: 50%; /* Pure Full Circle configuration */
            object-fit: cover;
            background-color: #f1f5f9;
            display: block;
        }

        .portrait-initials-asset {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            color: var(--brand-green-mid);
            font-family: var(--font-display);
            font-size: 2.3rem;
            font-weight: 800;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Base Data Grid View Segment */
        .deck-body {
            padding: 96px 48px 44px 48px;
            background-color: var(--surface);
            border-bottom-left-radius: var(--radius-lg);
            border-bottom-right-radius: var(--radius-lg);
            background-image: radial-gradient(#e2e8f0 1.5px, transparent 1.5px);
            background-size: 14px 14px;
            background-position: center top;
        }

        .user-full-name {
            font-family: var(--font-display);
            font-size: 2.2rem;
            font-weight: 800;
            color: var(--brand-green-dark);
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            text-align: center;
            line-height: 1.1;
        }

        .pill-title-container {
            background: var(--brand-gold-gradient);
            padding: 6px 48px;
            border-radius: 24px;
            box-shadow: 0 4px 14px rgba(217, 119, 6, 0.28);
            margin: 0 auto 36px auto;
            display: table;
        }
        .pill-title-text { color: #ffffff; font-family: var(--font-body); font-size: 0.88rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; text-align: center; }

        .section-headline {
            font-family: var(--font-display); font-size: 0.72rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-muted); margin-bottom: 16px; border-bottom: 1px solid var(--border); padding-bottom: 4px;
        }

        .details-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px 36px; margin-bottom: 32px; }
        .details-grid:last-of-type { margin-bottom: 0; }

        .info-cell { display: flex; align-items: flex-start; gap: 14px; border-bottom: 1px solid #f8fafc; padding-bottom: 10px; }
        .icon-box {
            width: 36px; height: 36px; background: #f1f5f9; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; color: var(--brand-green-light); font-size: 0.9rem; flex-shrink: 0;
        }
        .cell-content { padding-top: 1px; flex: 1; min-width: 0; }
        .cell-label { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: var(--text-muted); margin-bottom: 2px; }
        .cell-value { font-size: 0.95rem; font-weight: 500; color: var(--text-main); line-height: 1.3; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        a.cell-value { text-decoration: none; display: inline-block; transition: color 0.15s ease; }
        a.cell-value:hover { color: var(--brand-green-light); text-decoration: underline; }

        .value-empid { font-family: monospace; font-weight: 600; color: var(--brand-green-mid); background: #e0f2fe; padding: 1px 6px; border-radius: 4px; font-size: 0.88rem; }
        .value-blood { color: #dc2626; font-weight: 700; background: #fee2e2; padding: 1px 8px; border-radius: 4px; font-size: 0.85rem; display: inline-block; }

        @media (max-width: 576px) {
            .details-grid { grid-template-columns: 1fr; gap: 14px; }
            .deck-body { padding: 84px 22px 24px 22px; }
            .user-full-name { font-size: 1.75rem; }
            .deck-header-graphics { height: 260px; }
            .profile-avatar-anchor { top: 185px; }
        }
    </style>
</head>
<body>

<div class="showcase-deck">
    
    <div class="deck-header-graphics">
        <div class="pattern-center-stripe"></div>
        <div class="pattern-wing-left-outer"></div>
        <div class="pattern-wing-left-inner"></div>
        <div class="pattern-wing-left-gold-trim"></div>
        <div class="pattern-wing-right-outer"></div>
        <div class="pattern-wing-right-inner"></div>
        <div class="pattern-wing-right-gold-trim"></div>
        
        <div class="brand-shield-deck">
            <div class="logo-spherical-icon">e</div>
            <div class="logo-brand-headline"><span class="token-evo">evo</span><span class="token-lutra">lutra</span></div>
        </div>
    </div>

    <div class="profile-avatar-anchor">
        <div class="portrait-circle-ring">
            <?php if ($hasValidImage): ?>
                <img src="<?php echo $resolvedImgSrc; ?>" alt="Profile Photo" class="portrait-image-asset">
            <?php else: ?>
                <div class="portrait-initials-asset"><?php echo $userInitials; ?></div>
            <?php endif; ?>
        </div>
    </div>

    <div class="deck-body">
        
        <h1 class="user-full-name"><?php echo $full_name; ?></h1>
        
        <div class="pill-title-container">
            <div class="pill-title-text"><?php echo $designation; ?></div>
        </div>

        <div class="section-headline">Corporate Identity</div>
        <div class="details-grid">
            <div class="info-cell">
                <div class="icon-box"><i class="fa-solid fa-id-card"></i></div>
                <div class="cell-content">
                    <div class="cell-label">Employee ID</div>
                    <div class="cell-value"><span class="value-empid"><?php echo $emp_id; ?></span></div>
                </div>
            </div>
            <div class="info-cell">
                <div class="icon-box"><i class="fa-solid fa-sitemap"></i></div>
                <div class="cell-content">
                    <div class="cell-label">Department Team</div>
                    <div class="cell-value"><?php echo $team; ?></div>
                </div>
            </div>
            <div class="info-cell">
                <div class="icon-box"><i class="fa-solid fa-envelope"></i></div>
                <div class="cell-content">
                    <div class="cell-label">Email Address</div>
                    <a href="mailto:<?php echo $email; ?>" class="cell-value" title="<?php echo $email; ?>"><?php echo $email; ?></a>
                </div>
            </div>
            <div class="info-cell">
                <div class="icon-box"><i class="fa-solid fa-phone"></i></div>
                <div class="cell-content">
                    <div class="cell-label">Contact Phone</div>
                    <a href="tel:<?php echo $contact; ?>" class="cell-value">+91 <?php echo $contact; ?></a>
                </div>
            </div>
        </div>

        <div class="section-headline">Logistics & Safety Dynamics</div>
        <div class="details-grid">
            <div class="info-cell">
                <div class="icon-box" style="color:#dc2626;"><i class="fa-solid fa-droplet"></i></div>
                <div class="cell-content">
                    <div class="cell-label">Blood Group</div>
                    <div class="cell-value"><span class="value-blood"><?php echo $blood_group; ?></span></div>
                </div>
            </div>
            <div class="info-cell">
                <div class="icon-box" style="color:#f43f5e;"><i class="fa-solid fa-heart-pulse"></i></div>
                <div class="cell-content">
                    <div class="cell-label">Emergency Line</div>
                    <a href="tel:<?php echo $emergency_contact; ?>" class="cell-value" style="font-weight:600;">+91 <?php echo $emergency_contact; ?></a>
                </div>
            </div>
            <div class="info-cell">
                <div class="icon-box" style="color:#0284c7;"><i class="fa-brands fa-linkedin-in"></i></div>
                <div class="cell-content">
                    <div class="cell-label">LinkedIn Connect</div>
                    <?php if($linkedin !== '—'): ?>
                        <a href="<?php echo $linkedin; ?>" target="_blank" class="cell-value" style="color:#0284c7; font-weight:600;">View Profile Link <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.7rem; margin-left:1px;"></i></a>
                    <?php else: ?>
                        <span class="cell-value">—</span>
                    <?php endif; ?>
                </div>
            </div>
            <div class="info-cell">
                <div class="icon-box"><i class="fa-solid fa-location-dot"></i></div>
                <div class="cell-content">
                    <div class="cell-label">Registered Node Address</div>
                    <div class="cell-value" title="<?php echo $address; ?>"><?php echo $address; ?></div>
                </div>
            </div>
        </div>

    </div>
    
</div>

</body>
</html>