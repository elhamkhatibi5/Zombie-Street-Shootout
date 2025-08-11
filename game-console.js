document.addEventListener("DOMContentLoaded", () => {
  const outputEl = document.getElementById("output");

  // تابع نمایش متن در صفحه
  function log(msg) {
    outputEl.innerHTML += msg + "<br>";
  }

  // آیکون قلب قرمز برای همه دستگاه‌ها
  const redHeart = '<i class="fa-solid fa-heart" style="color:red;"></i>';

  // مشخصات بازیکن
  const player = {
    name: "Elham",
    health: 100,
    currentWeapon: "pistol",
    inventory: {
      knife: { ammo: Infinity, damage: 10, icon: '<i class="fa-solid fa-utensils" style="color:silver;"></i>' },
      pistol: { ammo: 3, damage: 25, icon: '<i class="fa-solid fa-gun" style="color:gray;"></i>' },
      shotgun: { ammo: 2, damage: 50, icon: '<i class="fa-solid fa-skull-crossbones" style="color:white;"></i>' },
      rifle: { ammo: 4, damage: 40, icon: '<i class="fa-solid fa-crosshairs" style="color:orange;"></i>' },
      flamethrower: { ammo: 1, damage: 70, icon: '<i class="fa-solid fa-fire" style="color:orangered;"></i>' }
    }
  };

  // انواع زامبی
  const zombies = [
    { type: "Walker", health: 50, icon: '<i class="fa-solid fa-person-walking" style="color:green;"></i>' },
    { type: "Runner", health: 75, icon: '<i class="fa-solid fa-person-running" style="color:lime;"></i>' },
    { type: "Brute", health: 120, icon: '<i class="fa-solid fa-dumbbell" style="color:gold;"></i>' }
  ];

  // انتخاب زامبی
  const currentZombieIndex = 1;
  let zombie = { ...zombies[currentZombieIndex] };

  // شروع بازی
  log(`Player: <strong>${player.name}</strong> ${redHeart} ${player.health}`);
  log(`Zombie: <strong>${zombie.type}</strong> ${zombie.icon} ${redHeart} ${zombie.health}`);
  log("<span style='color:#888;'>--------------------------------------------------</span>");

  function attack() {
    let weapon = player.inventory[player.currentWeapon];

    if (weapon.ammo > 0 || weapon.ammo === Infinity) {
      log(`Attacking with <strong>${player.currentWeapon}</strong> ${weapon.icon}`);

      // حمله بازیکن
      zombie.health -= weapon.damage;
      if (weapon.ammo !== Infinity) {
        weapon.ammo--;
      }
      log(`Zombie took <span style="color:orange;">${weapon.damage}</span> damage. ${redHeart} ${zombie.health}`);

      // حمله زامبی
      if (zombie.health > 0) {
        player.health -= 15;
        log(`Zombie attacks back! Player health: ${redHeart} ${player.health}`);
      }
    } else {
      log(`No ammo for ${player.currentWeapon}! Switching to knife...`);
      player.currentWeapon = "knife";
      attack();
    }
  }

  // مبارزه تا مرگ یکی
  while (player.health > 0 && zombie.health > 0) {
    attack();
  }

  // وضعیت نهایی
  log("<span style='color:#888;'>--------------------------------------------------</span>");
  log(`Final Player Status: ${redHeart} ${player.health}`);
  log(`Final Zombie Status: ${redHeart} ${zombie.health}`);
});
