

# Complete Step-by-Step Guide: Building Your Brick App for Android

This guide assumes you have ZERO experience. Follow every step exactly.

---

## Phase 1: Install the Required Software (One-Time Setup)

### Step 1: Install Node.js
1. Go to https://nodejs.org
2. Click the big green button that says **"LTS"** (Long Term Support)
3. Run the downloaded file and click "Next" through everything
4. To verify it worked: Open **Command Prompt** (Windows) or **Terminal** (Mac)
   - Type `node --version` and press Enter
   - You should see something like `v20.x.x`

### Step 2: Install Android Studio
1. Go to https://developer.android.com/studio
2. Click **"Download Android Studio"**
3. Run the installer - accept all defaults
4. When it opens for the first time, choose **"Standard"** setup
5. It will download extra components (this takes 10-30 minutes depending on internet)
6. Once done, go to **More Actions > SDK Manager**
7. Under the **"SDK Platforms"** tab, check **Android 14 (API 34)** and click Apply
8. Under the **"SDK Tools"** tab, make sure these are checked:
   - Android SDK Build-Tools
   - Android SDK Command-line Tools
   - Android Emulator
   - Android SDK Platform-Tools
9. Click **Apply** and let it download

### Step 3: Install Git
1. Go to https://git-scm.com/downloads
2. Download for your operating system
3. Run the installer - accept all defaults
4. Verify: Open Command Prompt/Terminal, type `git --version`

---

## Phase 2: Get Your Code from Lovable to Your Computer

### Step 4: Create a GitHub Account (if you don't have one)
1. Go to https://github.com
2. Click **Sign Up** and create a free account

### Step 5: Connect Lovable to GitHub
1. In Lovable, click your **project name** in the top-left corner
2. Click **Settings**
3. Go to the **GitHub** tab
4. Click **Connect to GitHub** and authorize it
5. Click **Export to GitHub** - this creates a copy of your code on GitHub

### Step 6: Download the Code to Your Computer
1. Go to your GitHub repository (the link Lovable gives you after export)
2. Click the green **"Code"** button
3. Copy the URL shown
4. Open Command Prompt/Terminal
5. Navigate to where you want the project (e.g., your Desktop):
```text
cd Desktop
```
6. Clone (download) the code:
```text
git clone YOUR_COPIED_URL_HERE
```
7. Go into the project folder:
```text
cd calm-tap-zone
```

---

## Phase 3: Set Up the Project

### Step 7: Install Project Dependencies
In your terminal (make sure you're inside the project folder):
```text
npm install
```
This downloads all the libraries the app needs. Wait for it to finish.

### Step 8: Add Android to the Project
Run this command:
```text
npx cap add android
```
This creates an `android` folder with all the native Android code.

### Step 9: Add NFC Permission
You need to tell Android your app uses NFC:

1. Open this file in any text editor (Notepad works):
```text
android/app/src/main/AndroidManifest.xml
```
2. Find the line that says `<manifest ...>` near the top
3. Right BELOW it (but ABOVE `<application`), add these two lines:
```text
<uses-permission android:name="android.permission.NFC" />
<uses-feature android:name="android.hardware.nfc" android:required="true" />
```
4. Save the file

### Step 10: Build and Sync
Run these commands one at a time:
```text
npm run build
npx cap sync
```
- `npm run build` compiles your web app
- `npx cap sync` copies it into the Android project

---

## Phase 4: Run on Your Phone

### Option A: Run on a Physical Android Phone (Recommended for NFC)

NFC does NOT work on emulators - you need a real phone.

1. On your Android phone, go to **Settings > About Phone**
2. Tap **"Build Number"** 7 times - this enables Developer Mode
3. Go back to **Settings > Developer Options** (it should now appear)
4. Turn on **USB Debugging**
5. Also make sure **NFC** is turned on in your phone settings
6. Plug your phone into your computer with a USB cable
7. Your phone may ask "Allow USB debugging?" - tap **Allow**
8. In your terminal, run:
```text
npx cap run android
```
9. It will show a list of devices - select your phone
10. The app will install and open on your phone

### Option B: Run on an Emulator (No NFC, but good for testing UI)

1. Open Android Studio
2. Click **More Actions > Virtual Device Manager**
3. Click **Create Device**
4. Pick a phone (e.g., Pixel 7) and click **Next**
5. Select a system image (e.g., API 34) and click **Next > Finish**
6. Click the Play button to start the emulator
7. In your terminal:
```text
npx cap run android
```
8. Select the emulator from the list

---

## Phase 5: Making Changes and Updating

Every time you make changes in Lovable and want to see them on your phone:

### Step 11: Pull Latest Changes
```text
git pull origin main
npm install
npm run build
npx cap sync
npx cap run android
```

### Shortcut: Live Reload (Already Set Up)
Your app is already configured to load from the Lovable preview URL, so while developing, changes you make in Lovable will show up on your phone automatically (as long as your phone has internet). You only need to do the full build process when you want to create a standalone app that works without internet.

---

## Phase 6: Publishing to Google Play Store

When you're ready to publish:

### Step 12: Remove the Live Reload URL
Before publishing, you need the app to work offline. Open `capacitor.config.ts` and remove or comment out the `server` section:
```text
// Remove this block before publishing:
// server: {
//   url: '...',
//   cleartext: true
// },
```
Then rebuild: `npm run build && npx cap sync`

### Step 13: Create a Signed APK/AAB
1. Open Android Studio
2. Go to **File > Open** and select the `android` folder inside your project
3. Go to **Build > Generate Signed Bundle / APK**
4. Choose **Android App Bundle (AAB)** (Google Play requires this)
5. Click **Create New** to make a signing key:
   - Choose a location to save the `.jks` file (KEEP THIS FILE SAFE - you need it for every update)
   - Set a password
   - Fill in your name/organization
6. Click **Next**, choose **Release**, click **Finish**
7. The `.aab` file will be in `android/app/release/`

### Step 14: Create a Google Play Developer Account
1. Go to https://play.google.com/console
2. Sign up - there is a one-time **$25 fee**
3. Complete the identity verification (takes 1-3 days)

### Step 15: Upload to Google Play
1. In Google Play Console, click **Create App**
2. Fill in the app name, language, and category
3. Go to **Production > Create New Release**
4. Upload your `.aab` file
5. Fill in all required sections:
   - App description and screenshots
   - Privacy policy (required - you can use a free generator)
   - Content rating questionnaire
   - Target audience
6. Submit for review (takes 1-7 days)

---

## Quick Reference: Common Commands

| What you want to do | Command |
|---|---|
| Install dependencies | `npm install` |
| Build the web app | `npm run build` |
| Sync to Android | `npx cap sync` |
| Run on device/emulator | `npx cap run android` |
| Open in Android Studio | `npx cap open android` |
| Pull latest from GitHub | `git pull origin main` |

---

## Troubleshooting Common Issues

**"Command not found" errors**: Make sure Node.js and Git are installed and restart your terminal.

**Phone not detected**: Try a different USB cable (some cables are charge-only). Make sure USB Debugging is enabled.

**App crashes on launch**: Run `npx cap sync` again. If still broken, delete the `android` folder and run `npx cap add android` again.

**NFC not working**: Make sure NFC is enabled in your phone's settings. NFC only works on physical devices, not emulators.

**Build fails**: Make sure you ran `npm install` first. Check that Android Studio SDK is properly installed.

---

## Technical Details

The NFC integration uses `@capgo/capacitor-nfc` which communicates with the phone's NFC hardware through Capacitor's native bridge. When the app detects it's running on a native device (`Capacitor.isNativePlatform()`), it enables NFC scanning. On web, it falls back to a simple button tap. The `useNfc` hook in `src/hooks/useNfc.ts` handles all NFC logic including scan sessions, tag detection, and timeout handling.

