# 🇰🇭 Khmer DateTimePicker

Khmer DateTimePicker is a lightweight JavaScript wrapper for Flatpickr
that adds:

-   ✅ Khmer language (months, weekdays)
-   ✅ Khmer digits (០១២៣៤៥៦៧៨៩)
-   ✅ Optional Buddhist Era year (+543)
-   ✅ Date or DateTime support
-   ✅ CDN ready (jsDelivr / unpkg)
-   ✅ Works with any framework (CI3, Laravel, React, Vue, etc.)

------------------------------------------------------------------------

## 🚀 Demo Preview

Example display:

    ១៧ កុម្ភៈ ២៥៦៩ ០៨:៣០

-   Khmer digits\
-   Khmer month names\
-   Buddhist Era year

<a href="https://smartercoding.github.io/khmer-datetime-picker" class="button">How to use it in your project</a>

------------------------------------------------------------------------

## 📦 Installation

### 1️⃣ Include Flatpickr

``` html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css">
<script src="https://cdn.jsdelivr.net/npm/flatpickr"></script>
```

------------------------------------------------------------------------

### 2️⃣ Include Khmer DateTimePicker (CDN)

``` html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/SmarterCoding/khmer-datetime-picker@Khmer-datetime-picker%40v1.0.0/dist/khmer-datetimepicker.css">
<script src="https://cdn.jsdelivr.net/gh/SmarterCoding/khmer-datetime-picker@Khmer-datetime-picker%40v1.0.0/dist/khmer-datetimepicker.min.js"></script>
```

------------------------------------------------------------------------

## 🛠 Basic Usage

``` html
<input id="date" placeholder="ជ្រើសរើសកាលបរិច្ឆេទ">

<script>
KhmerDateTimePicker.attach("#date", {
  enableTime: false,
  buddhistEra: true,
  khmerDigits: true
});
</script>
```

------------------------------------------------------------------------

## 🕒 DateTime Example (24-hour)

``` html
<input id="datetime">

<script>
KhmerDateTimePicker.attach("#datetime", {
  enableTime: true,
  time_24hr: true,
  dateFormat: "Y-m-d H:i",   // value submitted to backend
  altFormat: "j F Y H:i",    // display format
  buddhistEra: true,
  khmerDigits: true
});
</script>
```

------------------------------------------------------------------------

## ⚙ Options

  Option        Type      Default   Description
  ------------- --------- --------- ------------------------------
  enableTime    boolean   false     Enable time picker
  time_24hr     boolean   false     Use 24-hour format
  dateFormat    string    Y-m-d     Submitted value format
  altFormat     string    d/m/Y     Display format
  khmerDigits   boolean   true      Convert digits to Khmer
  buddhistEra   boolean   false     Add +543 year (display only)
  allowInput    boolean   true      Allow manual typing

------------------------------------------------------------------------

## 🧠 How It Works

-   The actual value (dateFormat) remains Gregorian calendar\
-   The display (altFormat) can show:
    -   Khmer digits
    -   Buddhist Era year
-   Khmer digits are converted automatically
-   If users type Khmer digits manually, they are converted back for
    parsing

------------------------------------------------------------------------

## 📁 Project Structure

    khmer-datetimepicker/
     ├── dist/
     │    ├── khmer-datetimepicker.min.js
     │    └── khmer-datetimepicker.css
     ├── README.md
     ├── LICENSE

------------------------------------------------------------------------

## 🌐 CDN Publishing Guide

### Using GitHub + jsDelivr

1.  Push to GitHub

2.  Create a release tag (example: v1.0.0)

3.  Use:

   -  https://cdn.jsdelivr.net/gh/SmarterCoding/khmer-datetime-picker@Khmer-datetime-picker%40v1.0.0/dist/khmer-datetimepicker.min.js
   -  https://cdn.jsdelivr.net/gh/SmarterCoding/khmer-datetime-picker@Khmer-datetime-picker%40v1.0.0/dist/khmer-datetimepicker.css


------------------------------------------------------------------------

## 🔥 Compatible With

-   CodeIgniter 3 / 4
-   Laravel
-   React
-   Vue
-   Bootstrap
-   Any HTML project

------------------------------------------------------------------------

## 📜 License

MIT License

Free for commercial and personal use.

------------------------------------------------------------------------

## 👨‍💻 Author

Developed for Khmer community 🇰🇭\
Feel free to contribute or improve.
