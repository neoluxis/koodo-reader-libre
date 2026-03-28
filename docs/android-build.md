# Android Build Guide

This project uses Capacitor to wrap the existing web build into an Android app.

## Prerequisites

- Node.js 20 or newer
- Yarn 1.x
- Java 21
- Android SDK
- `adb` available in `PATH` if you want to install to a device

If Java 21 is not your default JDK, set `JAVA_HOME` before running Gradle commands:

```sh
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk
export PATH=$JAVA_HOME/bin:$PATH
```

## Install dependencies

```sh
yarn
```

## Build the Android debug APK

From the project root:

```sh
yarn android:apk
```

This command performs the following steps:

1. Builds the web assets with `react-scripts build`
2. Syncs the web assets into the Capacitor Android project
3. Runs `./gradlew assembleDebug`

The generated APK is:

```sh
android/app/build/outputs/apk/debug/app-debug.apk
```

## Sync web assets without building an APK

```sh
yarn android:sync
```

Use this when you only want to refresh the Android project after changing web code.

## Open the Android project

```sh
yarn android:open
```

This opens the Capacitor Android project in Android Studio if it is installed.

## Install to a connected device

First confirm the device is visible:

```sh
adb devices -l
```

Then install the debug APK:

```sh
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

You can also use the package script:

```sh
yarn android:run
```

## Troubleshooting

### `invalid source release: 21`

Your Gradle build is using the wrong JDK. Set `JAVA_HOME` to Java 21 and rerun the build.

### Gradle cannot write to `~/.gradle`

If your environment restricts writes outside the repo, use:

```sh
GRADLE_USER_HOME=$PWD/.gradle-home ./gradlew assembleDebug
```

Run it from the `android/` directory.

### `adb` cannot detect the device

- Enable developer options on the phone
- Enable USB debugging
- Accept the computer authorization prompt on the device
- Reconnect the USB cable and rerun `adb devices -l`
