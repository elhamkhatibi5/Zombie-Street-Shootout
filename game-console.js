document.addEventListener("DOMContentLoaded", () => {
  const outputEl = document.getElementById("output");

  // تابع لاگ: هم مرورگر، هم کنسول
  function log(msg, consoleColor = "white") {
    // به صفحه
    outputEl.innerHTML += msg + "<br>";
    // به کنسول با رنگ
    console.log(`%c${msg.replace(/<[^>]+>/g, '')}`, `color:${consoleColor}; font-weight:bold;`);
  }

  const redHeart = '<i class="fa-solid fa-heart" style="color:red;"></i>';

  let currentWeapon = "pistol";
  let currentZombieIndex = 1;
  let overrideAmmo = null;

  const player = {
    name: "Elham",
    health: 100,
    currentWeapon: currentWeapon,
    inventory: {
      knife: { ammo: Infinity, damage: 10, icon: '🗡️' },
      pistol: { ammo: 3, damage: 25, icon: '🔫' },
      shotgun: { ammo: 2, damage: 50, icon: '💀' },
      rifle: { ammo: 4, damage: 40, icon: '🎯' },
      flamethrower: { ammo: 1, damage: 70, icon: '🔥' }
    }
  };

  if (overrideAmmo && player.inventory[overrideAmmo.weapon]) {
    player.inventory[overrideAmmo.weapon].ammo = overrideAmmo.ammo;
  }

  const zombies = [
    { type: "Walker", health: 50, icon: '🚶' },
    { type: "Runner", health: 75, icon: '🏃' },
    { type: "Brute", health: 120, icon: '🏋️' }
  ];

  let zombie = { ...zombies[currentZombieIndex] };

  function separator() {
    log("<span style='color:#888;'>--------------------------------------------------</span>", "#888");
  }

  log(`👤 Player: ${player.name} ${redHeart} <span style="color:#d33;">${player.health}</span>`, "#ff7777");
  log(`🧟 Zombie: ${zombie.type} ${zombie.icon} ${redHeart} <span style="color:#d33;">${zombie.health}</span>`, "lime");
  separator();

  function attack() {
    let weaponName = player.currentWeapon;
    let weapon = player.inventory[weaponName];

    if (weapon.ammo > 0 || weapon.ammo === Infinity) {
      log(`⚔️ Attacking with ${weaponName} ${weapon.icon} (Damage: ${weapon.damage}, Ammo: ${weapon.ammo === Infinity ? '∞' : weapon.ammo})`, "orange");

      zombie.health -= weapon.damage;
      if (zombie.health < 0) zombie.health = 0;

      if (weapon.ammo !== Infinity) weapon.ammo--;

      log(`💥 Zombie takes ${weapon.damage} damage → Health: ${zombie.health}`, "#ff4444");

      if (zombie.health > 0) {
        player.health -= 15;
        if (player.health < 0) player.health = 0;
        log(`🩸 Zombie attacks back! Player Health: ${player.health}`, "#ff9999");
      }
    } else {
      if (weaponName !== "knife") {
        log(`❌ No ammo for ${weaponName}! Switching to knife 🗡️...`, "yellow");
        player.currentWeapon = "knife";
        attack();
      } else {
        log("💀 No ammo left to attack! Game Over.", "red");
      }
    }
  }

  while (player.health > 0 && zombie.health > 0) {
    attack();
    separator();
  }

  log(`🏁 Battle Over!`, "#00ffcc");
  log(`❤️ Player final health: ${player.health}`, "#ff7777");
  log(`🧟 Zombie final health: ${zombie.health}`, "lime");
});
