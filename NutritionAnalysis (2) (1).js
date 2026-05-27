
//   // ─── STATE ────────────────────────────────────────────────────────────────
//   let gender = 'male';
//   let macroChart = null;

// //   // ─── GENDER TOGGLE ────────────────────────────────────────────────────────
// //   document.querySelectorAll('.gender-btn').forEach(btn => {
// //     btn.addEventListener('click', () => {
// //       document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('active'));
// //       btn.classList.add('active');
// //       gender = btn.dataset.gender;
// //       document.getElementById('gender').value = gender;
// //     });
// //   });

// //   // ─── VALIDATION ───────────────────────────────────────────────────────────
// //   function validate() {
// //     let valid = true;
// //     const fields = [
// //       { id: 'weight', min: 20, max: 300, errId: 'weight-err' },
// //       { id: 'target', min: 20, max: 300, errId: 'target-err' },
// //       { id: 'height', min: 100, max: 250, errId: 'height-err' },
// //       { id: 'age',    min: 10,  max: 120, errId: 'age-err' },
// //     ];
// //     fields.forEach(f => {
// //       const el = document.getElementById(f.id);
// //       const err = document.getElementById(f.errId);
// //       const val = parseFloat(el.value);
// //       if (!el.value || isNaN(val) || val < f.min || val > f.max) {
// //         el.classList.add('error');
// //         err.classList.add('show');
// //         valid = false;
// //       } else {
// //         el.classList.remove('error');
// //         err.classList.remove('show');
// //       }
// //     });
// //     return valid;
// //   }

// //   // ─── CALCULATIONS ─────────────────────────────────────────────────────────
// //   function calcBMI(weight, height) {
// //     return weight / ((height / 100) ** 2);
// //   }

// //   function bmiCategory(bmi) {
// //     if (bmi < 18.5) return { label: 'Underweight', cls: 'fat' };
// //     if (bmi < 25)   return { label: 'Normal Weight', cls: 'accent' };
// //     if (bmi < 30)   return { label: 'Overweight', cls: 'carb' };
// //     return             { label: 'Obese', cls: 'protein' };
// //   }

// //   function bmiNeedlePos(bmi) {
// //     // Map BMI 15–40 to 0–100%
// //     const clamped = Math.max(15, Math.min(40, bmi));
// //     return ((clamped - 15) / 25) * 100;
// //   }

// //   function calcBMR(weight, height, age, gender) {
// //     // Mifflin–St Jeor
// //     if (gender === 'male')
// //       return 10 * weight + 6.25 * height - 5 * age + 5;
// //     else
// //       return 10 * weight + 6.25 * height - 5 * age - 161;
// //   }

// //   function calcMacros(kcal) {
// //     // 50% carbs, 30% protein, 20% fat
// //     const carbKcal    = kcal * 0.50;
// //     const proteinKcal = kcal * 0.30;
// //     const fatKcal     = kcal * 0.20;
// //     return {
// //       carbs:   Math.round(carbKcal / 4),
// //       protein: Math.round(proteinKcal / 4),
// //       fat:     Math.round(fatKcal / 9),
// //     };
// //   }

// //   // ─── COUNTER ANIMATION ────────────────────────────────────────────────────
// //   function animateNumber(el, from, to, decimals = 0, duration = 700) {
// //     const start = performance.now();
// //     function update(ts) {
// //       const progress = Math.min((ts - start) / duration, 1);
// //       const ease = 1 - Math.pow(1 - progress, 3);
// //       const val = from + (to - from) * ease;
// //       el.textContent = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString();
// //       if (progress < 1) requestAnimationFrame(update);
// //     }
// //     requestAnimationFrame(update);
// //   }

// //   // ─── CHART ────────────────────────────────────────────────────────────────
// //   function renderChart(kcal, macros) {
// //     const ctx = document.getElementById('macro-chart').getContext('2d');
// //     document.getElementById('chart-kcal').textContent = Math.round(kcal).toLocaleString();

// //     const data = [macros.carbs * 4, macros.protein * 4, macros.fat * 9];
// //     const total = data.reduce((a, b) => a + b, 0);

// //     if (macroChart) macroChart.destroy();

// //     macroChart = new Chart(ctx, {
// //       type: 'doughnut',
// //       data: {
// //         labels: ['Carbohydrates', 'Protein', 'Fat'],
// //         datasets: [{
// //           data,
// //           backgroundColor: ['#f4c430', '#ff6b6b', '#4ecdc4'],
// //           borderColor: '#12121a',
// //           borderWidth: 3,
// //           hoverOffset: 8,
// //         }]
// //       },
// //       options: {
// //         cutout: '70%',
// //         plugins: {
// //           legend: { display: false },
// //           tooltip: {
// //             callbacks: {
// //               label: ctx => {
// //                 const pct = ((ctx.raw / total) * 100).toFixed(1);
// //                 return ` ${ctx.label}: ${pct}%`;
// //               }
// //             },
// //             backgroundColor: '#1a1a26',
// //             borderColor: 'rgba(255,255,255,0.07)',
// //             borderWidth: 1,
// //             titleColor: '#f0eee8',
// //             bodyColor: '#6b6a7a',
// //             padding: 12,
// //             cornerRadius: 8,
// //           }
// //         },
// //         animation: { duration: 800, easing: 'easeOutQuart' },
// //         responsive: true,
// //         maintainAspectRatio: true,
// //       }
// //     });

// //     // Legend
// //     const legendEl = document.getElementById('macro-legend');
// //     const labels = ['Carbohydrates', 'Protein', 'Fat'];
// //     const colors = ['#f4c430', '#ff6b6b', '#4ecdc4'];
// //     const grams  = [macros.carbs, macros.protein, macros.fat];
// //     const pcts   = data.map(d => Math.round((d / total) * 100));

// //     legendEl.innerHTML = labels.map((l, i) => `
// //       <div class="legend-item">
// //         <div class="legend-dot" style="background:${colors[i]}"></div>
// //         <span class="legend-name">${l}</span>
// //         <span class="legend-grams" style="color:${colors[i]}">${grams[i]}g</span>
// //         <span class="legend-pct">${pcts[i]}%</span>
// //       </div>
// //     `).join('');
// //   }

// //   // ─── TABLE ────────────────────────────────────────────────────────────────
// //   function renderTable(data) {
// //     const tbody = document.getElementById('result-table');
// //     tbody.innerHTML = data.map(row => `
// //       <tr>
// //         <td class="td-label">${row.label}</td>
// //         <td class="td-value ${row.color || ''}">${row.value}</td>
// //         <td class="td-unit">${row.unit}</td>
// //         <td class="td-unit" style="color:var(--muted);font-size:11px">${row.note || ''}</td>
// //       </tr>
// //     `).join('');
// //   }

//   // ─── MAIN CALCULATION ─────────────────────────────────────────────────────
//   document.getElementById('nutri-form').addEventListener('submit', e => {
//     e.preventDefault();
//     if (!validate()) return;

//     const weight   = parseFloat(document.getElementById('weight').value);
//     const target   = parseFloat(document.getElementById('target').value);
//     const height   = parseFloat(document.getElementById('height').value);
//     const age      = parseInt(document.getElementById('age').value);
//     const activity = parseFloat(document.getElementById('activity').value);

//     const bmi   = calcBMI(weight, height);
//     const bmr   = calcBMR(weight, height, age, gender);
//     const tdee  = bmr * activity;
//     const cat   = bmiCategory(bmi);
//     console.log(weight,target,height,age,activity);


//     // Calorie target based on goal
//     const diff   = target - weight;
//     const goalKcal = diff < -0.5 ? tdee - 500 :
//                      diff >  0.5 ? tdee + 300 : tdee;
//     const macros = calcMacros(goalKcal);

//     // ── BMI card
//     const bmiEl = document.getElementById('bmi-val');
//     animateNumber(bmiEl, 0, bmi, 1);
//     document.getElementById('bmi-category').textContent = cat.label;

//     // BMI needle with delay to allow render
//     setTimeout(() => {
//       document.getElementById('bmi-needle').style.left = bmiNeedlePos(bmi) + '%';
//     }, 100);

//     // ── Calories card
//     animateNumber(document.getElementById('tdee-val'), 0, tdee, 0);

//     // ── Target card
//     animateNumber(document.getElementById('target-cal-val'), 0, goalKcal, 0);

//     const goalBadgeEl = document.getElementById('goal-badge');
//     if (Math.abs(diff) <= 0.5) {
//       document.getElementById('target-sub').textContent = 'maintenance calories';
//       goalBadgeEl.innerHTML = `<div class="goal-indicator maintain">⟳ Maintain current weight</div>`;
//     } else if (diff < 0) {
//       document.getElementById('target-sub').textContent = `${Math.abs(diff).toFixed(1)} kg to lose`;
//       goalBadgeEl.innerHTML = `<div class="goal-indicator deficit">↓ 500 kcal/day deficit</div>`;
//     } else {
//       document.getElementById('target-sub').textContent = `${diff.toFixed(1)} kg to gain`;
//       goalBadgeEl.innerHTML = `<div class="goal-indicator surplus">↑ 300 kcal/day surplus</div>`;
//     }

//     // ── Table
//     // renderTable([
//     //   { label: 'BMI', value: bmi.toFixed(1), unit: 'kg/m²', note: cat.label },
//     //   { label: 'Basal Metabolic Rate', value: Math.round(bmr).toLocaleString(), unit: 'kcal/day', note: 'Mifflin–St Jeor' },
//     //   { label: 'Total Daily Energy', value: Math.round(tdee).toLocaleString(), unit: 'kcal/day', note: 'TDEE (maintenance)' },
//     //   { label: 'Target Calories', value: Math.round(goalKcal).toLocaleString(), unit: 'kcal/day', note: diff < -0.5 ? '500 kcal deficit' : diff > 0.5 ? '300 kcal surplus' : 'Maintenance' },
//     //   { label: '◈ Carbohydrates', value: macros.carbs, unit: 'g', note: '50% of target', color: 'dot-carb' },
//     //   { label: '◈ Protein', value: macros.protein, unit: 'g', note: '30% of target', color: 'dot-protein' },
//     //   { label: '◈ Fat', value: macros.fat, unit: 'g', note: '20% of target', color: 'dot-fat' },
//     // ]);

//     // // ── Chart
//     // document.getElementById('chart-placeholder').style.display = 'none';
//     // document.getElementById('chart-output').style.display = 'block';
//     // renderChart(goalKcal, macros);

//     // // ── Show results
//     // const resultsEl = document.getElementById('results');
//     // resultsEl.style.display = 'block';
//     // requestAnimationFrame(() => {
//     //   requestAnimationFrame(() => {
//     //     resultsEl.classList.add('visible');
//     //     resultsEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
//     //   });
//     // });
//   });

//   // ─── LIVE VALIDATION ──────────────────────────────────────────────────────



// NutritionAnalysis.js

// ------------------ VALIDATION ------------------
function validateInput(id, min, max) {
  const input = document.getElementById(id);
  const value = parseFloat(input.value);
  const errorMsg = document.getElementById(`${id}-err`);

  if (isNaN(value) || value < min || value > max) {
    errorMsg.style.display = "block";
    return null;
  } else {
    errorMsg.style.display = "none";
    return value;
  }
}

// ------------------ CALCULATIONS ------------------
function calculateBMI(weight, height) {
  const bmi = weight / ((height / 100) ** 2);
  let category = "Normal";

  if (bmi < 18.5) category = "Underweight";
  else if (bmi < 25) category = "Normal";
  else if (bmi < 30) category = "Overweight";
  else category = "Obese";

  return { bmi: bmi.toFixed(1), category };
}

function calculateBMR(weight, height, age, gender) {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

function calculateTDEE(bmr, activityFactor) {
  return bmr * activityFactor;
}

function calculateTargetCalories(tdee, currentWeight, targetWeight) {
  const diff = targetWeight - currentWeight;
  // Rough estimate: 7700 kcal per kg
  const adjustment = (diff * 7700) / 90; // spread over ~3 months
  return Math.round(tdee + adjustment);
}

// ------------------ CHART RENDERING ------------------
function renderMacroChart(calories) {
  const ctx = document.getElementById("macro-chart").getContext("2d");

  const protein = (calories * 0.3) / 4; // 30% protein
  const carbs = (calories * 0.45) / 4;  // 45% carbs
  const fats = (calories * 0.25) / 9;   // 25% fats

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Protein", "Carbs", "Fats"],
      datasets: [{
        data: [protein, carbs, fats],
        backgroundColor: ["#4e79a7", "#f28e2b", "#e15759"]
      }]
    },
    options: {
      cutout: "70%",
      plugins: { legend: { display: true } }
    }
  });

  document.getElementById("chart-kcal").textContent = calories;
  document.getElementById("chart-placeholder").style.display = "none";
  document.getElementById("chart-output").style.display = "block";
}

// ------------------ RESULTS DISPLAY ------------------
function updateResults(bmiData, tdee, targetCalories) {
  document.getElementById("bmi-val").textContent = bmiData.bmi;
  document.getElementById("bmi-category").textContent = bmiData.category;
  document.getElementById("tdee-val").textContent = Math.round(tdee);
  document.getElementById("target-cal-val").textContent = targetCalories;

  // Move BMI needle
  const needle = document.getElementById("bmi-needle");
  const percent = Math.min(100, (bmiData.bmi / 40) * 100);
  needle.style.left = `${percent}%`;
}

// ------------------ MAIN HANDLER ------------------
document.getElementById("nutri-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const weight = validateInput("weight", 20, 300);
  const target = validateInput("target", 20, 300);
  const height = validateInput("height", 100, 250);
  const age = validateInput("age", 10, 120);
  const gender = document.getElementById("gender").value;
  const activity = parseFloat(document.getElementById("activity").value);

  if (!weight || !target || !height || !age) return;

  const bmiData = calculateBMI(weight, height);
  const bmr = calculateBMR(weight, height, age, gender);
  const tdee = calculateTDEE(bmr, activity);
  const targetCalories = calculateTargetCalories(tdee, weight, target);

  updateResults(bmiData, tdee, targetCalories);
  renderMacroChart(targetCalories);
});

// ------------------ GENDER TOGGLE ------------------
document.querySelectorAll(".gender-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".gender-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("gender").value = btn.dataset.gender;
  });
});
