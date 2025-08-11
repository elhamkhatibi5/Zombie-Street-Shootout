document.addEventListener("DOMContentLoaded", () => {
  const outputEl = document.getElementById("output");

  // تابع لاگ: هم مرورگر، هم کنسول با رنگ
  function log(msg, consoleColor = "white") {
    // داخل صفحه
    outputEl.innerHTML += msg + "<br>";
    // داخل کنسول بدون تگ HTML و با رنگ
    const plainText = msg.replace(/<[^>]+>/g, '');
    console.log(`%c${plainText}`, `color:${consoleColor}; font-weight:bold;`);
  }

  // آیکون قلب قرمز
  const redHeart = '<i class="fas fa-heart" style="color:red;"></i>';

  // متغیرهای تست (می‌تونی عوض کنی)
  let currentWeapon = "pistol"; // knife, pistol, shotgun, rifle, flamethrower
  let currentZombieIndex = 1; // 0=Walker, 1=Runner, 2=Brute
  let overrideAmmo = null; // مثال: {weapon:"pistol", ammo:0}

  // بازیکن و تجهیزات
  const player = {
    name: "Elham",
    health: 100,
    currentWeapon: currentWeapon,
    inventory: {
      knife: { ammo: Infinity, damage: 10, icon: '<i class="fas fa-utensils" style="color:silver;"></i>' },
      pistol: { ammo: 3, damage: 25, icon: '<i class="fas fa-gun" style="color:gray;"></i>' },
      shotgun: { ammo: 2, damage: 50, icon: '<i class="fas fa-skull-crossbones" style="color:white;"></i>' },
      rifle: { ammo: 4, damage: 40, icon: '<i class="fas fa-crosshairs" style="color:orange;"></i>' },
      flamethrower: { ammo: 1, damage: 70, icon: '<i class="fas fa-fire" style="color:orangered;"></i>' }
    }
  };

  // اعمال override مهمات (برای تست)
  if (overrideAmmo && player.inventory[overrideAmmo.weapon]) {
    player.inventory[overrideAmmo.weapon].ammo = overrideAmmo.ammo;
  }

  // زامبی‌ها
  const zombies = [
    { type: "Walker", health: 50, icon: '<i class="fas fa-walking" style="color:green;"></i>' },
    { type: "Runner", health: 75, icon: '<i class="fas fa-running" style="color:lime;"></i>' },
    { type: "Brute", health: 120, icon: '<i class="fas fa-dumbbell" style="color:gold;"></i>' }
  ];

  // کلون زامبی برای تغییرات
  let zombie = { ...zombies[currentZombieIndex] };

  // جداکننده رنگی
  function separator() {
    log('<span class="separator">--------------------------------------------------</span>', '#888');
  }

  // نمایش وضعیت اولیه
  log(`👤 Player: <strong>${player.name}</strong> ${redHeart} <span class="health number">${player.health}</span>`, '#ff5555');
  log(`🧟 Zombie: <strong>${zombie.type}</strong> ${zombie.icon} ${redHeart} <span class="health number">${zombie.health}</span>`, 'lime');
  separator();

  // تابع حمله
  function attack() {
    let weaponName = player.currentWeapon;
    let weapon = player.inventory[weaponName];

    if (weapon.ammo > 0 || weapon.ammo === Infinity) {
      log(`⚔️ Attacking with <strong>${weaponName}</strong> ${weapon.icon} (Damage: <span class="damage number">${weapon.damage}</span>, Ammo: <span class="ammo number">${weapon.ammo === Infinity ? '∞' : weapon.ammo}</span>)`, 'orange');

      // کاهش سلامتی زامبی
      zombie.health -= weapon.damage;
      if (zombie.health < 0) zombie.health = 0;

      // کاهش مهمات اگر بینهایت نیست
      if (weapon.ammo !== Infinity) weapon.ammo--;

      log(`💥 Zombie takes <span class="damage number">${weapon.damage}</span> damage → Health: <span class="health number">${zombie.health}</span>`, '#ff4444');

      // اگر زامبی زنده بود، حمله می‌کند
      if (zombie.health > 0) {
        player.health -= 15;
        if (player.health < 0) player.health = 0;
        log(`🩸 Zombie attacks back! Player Health: <span class="health number">${player.health}</span>`, '#ff9999');
      }
    } else {
      if (weaponName !== "knife") {
        log(`❌ No ammo for <strong>${weaponName}</strong>! Switching to <strong>knife</strong> 🗡️...`, 'yellow');
        player.currentWeapon = "knife";
        attack();
      } else {
        log("💀 No ammo left to attack! Game Over.", 'red');
      }
    }
  }

  // حلقه مبارزه
  while (player.health > 0 && zombie.health > 0) {
    attack();
    separator();
  }

  // نتایج نهایی
  log(`<strong>🏁 Battle Over!</strong>`, '#00ffcc');
  log(`❤️ Player final health: <span class="health number">${player.health}</span>`, '#ff5555');
  log(`🧟 Zombie final health: <span class="health number">${zombie.health}</span>`, 'lime');
});
