/*!
 * khmer-datetimepicker (flatpickr wrapper)
 * - Khmer language
 * - Khmer digits
 * - Optional Buddhist Era (+543) display year
 * - ✅ Khmer digits on calendar (days + header year)
 */
(function (global) {
  if (!global.flatpickr) {
    console.error("flatpickr not found. Load flatpickr first.");
    return;
  }

  // Khmer digits map
  var KH_NUM = ["០","១","២","៣","៤","៥","៦","៧","៨","៩"];

  function toKhmerDigits(str) {
    return String(str).replace(/\d/g, function (d) { return KH_NUM[d]; });
  }

  function toLatinDigits(str) {
    // convert Khmer digits back to 0-9 for parsing
    var map = {"០":"0","១":"1","២":"2","៣":"3","៤":"4","៥":"5","៦":"6","៧":"7","៨":"8","៩":"9"};
    return String(str).replace(/[០-៩]/g, function (d) { return map[d] || d; });
  }

  // Khmer locale for flatpickr
  var KhmerLocale = {
    weekdays: {
      shorthand: ["អា","ច","អ","ព","ព្រ","សុ","ស"],
      longhand: ["អាទិត្យ","ចន្ទ","អង្គារ","ពុធ","ព្រហស្បតិ៍","សុក្រ","សៅរ៍"]
    },
    months: {
      shorthand: ["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"],
      longhand: ["មករា","កុម្ភៈ","មីនា","មេសា","ឧសភា","មិថុនា","កក្កដា","សីហា","កញ្ញា","តុលា","វិច្ឆិកា","ធ្នូ"]
    },
    firstDayOfWeek: 1,
    rangeSeparator: " ដល់ ",
    weekAbbreviation: "សប្តាហ៍",
    scrollTitle: "Scroll ដើម្បីប្តូរ",
    toggleTitle: "ចុចដើម្បីប្តូរ",
    amPM: ["ព្រឹក","ល្ងាច"]
  };

  // Register locale safely
  global.flatpickr.l10ns.km = KhmerLocale;

  function attach(selectorOrEl, opts) {
    opts = opts || {};

    var options = Object.assign(
      {
        locale: "km",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d/m/Y",
        allowInput: true,
        disableMobile: true,

        // custom flags
        khmerDigits: true,
        buddhistEra: false, // show +543 in altInput only

        // ✅ NEW: calendar UI digits
        calendarKhmerDigits: true,     // convert day numbers in calendar grid
        calendarBuddhistEra: false     // convert header year to BE (+543)
      },
      opts
    );

    var userOnReady = options.onReady;
    var userOnValueUpdate = options.onValueUpdate;
    var userOnChange = options.onChange;

    function decorateAlt(fp) {
      if (!fp.altInput) return;

      var txt = fp.altInput.value || "";

      // Buddhist era (display only)
      if (options.buddhistEra && fp.selectedDates && fp.selectedDates[0]) {
        var d = fp.selectedDates[0];
        var beYear = d.getFullYear() + 543;
        txt = txt.replace(/\b(\d{4})\b/, String(beYear));
      }

      if (options.khmerDigits) txt = toKhmerDigits(txt);

      fp.altInput.value = txt;
    }

    // ✅ NEW: decorate the calendar grid + header year
    function decorateCalendar(fp) {
      if (!options.calendarKhmerDigits) return;
      if (!fp || !fp.calendarContainer) return;

      // day numbers
      fp.calendarContainer.querySelectorAll(".flatpickr-day").forEach(function (day) {
        if (!day || !day.textContent) return;
        day.textContent = toKhmerDigits(day.textContent);
      });

      // header year
      var yearInput = fp.calendarContainer.querySelector(".cur-year");
      if (yearInput || yearInput.value) {
        var y = parseInt(toLatinDigits(yearInput.value), 10);
        // if (!isNaN(y)) {
          var showY = options.calendarBuddhistEra ? (y + 543) : y;
          yearInput.value = toKhmerDigits(showY);
        // }
      }
    }

    function renderKhHeader(fp){
  if (!fp || !fp.calendarContainer) return;

  setTimeout(function () {
    var monthsWrap = fp.calendarContainer.querySelector(".flatpickr-months");
    var monthSelect = fp.calendarContainer.querySelector(".flatpickr-monthDropdown-months");
    var yearInput = fp.calendarContainer.querySelector(".cur-year");

    if (!monthsWrap || !monthSelect || !yearInput) return;

    // Flatpickr internal year (AD)
    var adYear = parseInt(yearInput.value, 10);
    if (isNaN(adYear)) return;

    var showYear = options.calendarBuddhistEra ? (adYear + 543) : adYear;

    // current Khmer month text
    var monthText = monthSelect.options[monthSelect.selectedIndex].text;

    // create/update custom label
    var label = fp.calendarContainer.querySelector(".kh-header-label");
    if (!label) {
      label = document.createElement("div");
      label.className = "kh-header-label";
      label.style.fontWeight = "700";
      label.style.fontSize = "18px";
      label.style.textAlign = "center";
      label.style.padding = "6px 0";
      monthsWrap.appendChild(label);
    }

    label.textContent = monthText + " " + toKhmerDigits(showYear);

    // hide default year input (keep internal AD unchanged)
    yearInput.style.display = "none";
  }, 0);
}

    // ✅ NEW: allow editing year normally
    function normalizeCalendarTyping(fp) {
      if (!fp || !fp.calendarContainer) return;

      var yearInput = fp.calendarContainer.querySelector(".cur-year");
      if (!yearInput) return;

      yearInput.addEventListener("focus", function () {
        yearInput.value = toLatinDigits(yearInput.value);
      });
      yearInput.addEventListener("blur", function () {
        decorateCalendar(fp);
      });
    }

    function normalizeUserTypedAlt(fp) {
      if (!fp.altInput || !options.allowInput) return;
      fp.altInput.addEventListener("blur", function () {
        fp.altInput.value = toLatinDigits(fp.altInput.value);
      });
    }

    options.onReady = function (selectedDates, dateStr, instance) {
      decorateAlt(instance);
      decorateCalendar(instance);
      // decorateHeader(instance);   // 🔥 add this
      // renderKhHeader(instance);
      normalizeUserTypedAlt(instance);
      normalizeCalendarTyping(instance);
      if (typeof userOnReady === "function") userOnReady(selectedDates, dateStr, instance);
    };

    options.onValueUpdate = function (selectedDates, dateStr, instance) {
      decorateAlt(instance);
      decorateCalendar(instance);
      // decorateHeader(instance);   // 🔥 add this
      // renderKhHeader(instance);
      if (typeof userOnValueUpdate === "function") userOnValueUpdate(selectedDates, dateStr, instance);
    };

    options.onChange = function (selectedDates, dateStr, instance) {
      decorateAlt(instance);
      decorateCalendar(instance);
      // decorateHeader(instance);   // 🔥 add this
      // renderKhHeader(instance);
      if (typeof userOnChange === "function") userOnChange(selectedDates, dateStr, instance);
    };

    // ✅ Keep digits when user changes month/year
    var userOnOpen = options.onOpen;
    var userOnMonthChange = options.onMonthChange;
    var userOnYearChange = options.onYearChange;

    options.onOpen = function (selectedDates, dateStr, instance) {
      decorateCalendar(instance);
      // decorateHeader(instance);   // 🔥 add this
      // renderKhHeader(instance);
      if (typeof userOnOpen === "function") userOnOpen(selectedDates, dateStr, instance);
    };
    options.onMonthChange = function (selectedDates, dateStr, instance) {
      decorateCalendar(instance);
      // decorateHeader(instance);   // 🔥 add this
      // renderKhHeader(instance);
      if (typeof userOnMonthChange === "function") userOnMonthChange(selectedDates, dateStr, instance);
    };
    options.onYearChange = function (selectedDates, dateStr, instance) {
      decorateCalendar(instance);
      // decorateHeader(instance);   // 🔥 add this
      // renderKhHeader(instance);
      if (typeof userOnYearChange === "function") userOnYearChange(selectedDates, dateStr, instance);
    };

    return global.flatpickr(selectorOrEl, options);
  }

  global.KhmerDateTimePicker = {
    attach: attach,
    toKhmerDigits: toKhmerDigits,
    toLatinDigits: toLatinDigits
  };
})(window);
