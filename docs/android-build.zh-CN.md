# Android 构建说明

本项目使用 Capacitor 将现有的 Web 构建结果打包为 Android 应用。

## 前置条件

- Node.js 20 或更高版本
- Yarn 1.x
- Java 21
- Android SDK
- 如果需要安装到真机，`PATH` 中应可用 `adb`

如果 Java 21 不是系统默认 JDK，请先设置：

```sh
export JAVA_HOME=/usr/lib/jvm/java-21-openjdk
export PATH=$JAVA_HOME/bin:$PATH
```

## 安装依赖

```sh
yarn
```

## 构建 Android 调试 APK

在仓库根目录执行：

```sh
yarn android:apk
```

该命令会依次执行以下步骤：

1. 用 `react-scripts build` 构建 Web 静态资源
2. 将构建结果同步到 Capacitor Android 工程
3. 执行 `./gradlew assembleDebug`

生成的 APK 路径为：

```sh
android/app/build/outputs/apk/debug/app-debug.apk
```

## 只同步 Web 资源

```sh
yarn android:sync
```

当你只修改了前端代码，想更新 Android 工程中的静态资源时，可以使用这个命令。

## 打开 Android 工程

```sh
yarn android:open
```

如果本机安装了 Android Studio，这个命令会打开 Android 工程。

## 安装到已连接设备

先确认设备已连接：

```sh
adb devices -l
```

然后安装调试包：

```sh
adb install -r android/app/build/outputs/apk/debug/app-debug.apk
```

也可以直接使用脚本：

```sh
yarn android:run
```

## 常见问题

### `invalid source release: 21`

说明 Gradle 使用的不是 Java 21。请先设置 `JAVA_HOME` 为 Java 21，再重新执行构建。

### Gradle 无法写入 `~/.gradle`

如果当前环境不允许向仓库外写文件，可以在 `android/` 目录下执行：

```sh
GRADLE_USER_HOME=$PWD/../.gradle-home ./gradlew assembleDebug
```

### `adb` 无法识别设备

- 在手机上开启开发者选项
- 开启 USB 调试
- 接受手机上的调试授权弹窗
- 重新插拔数据线后再次执行 `adb devices -l`
