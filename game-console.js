document.addEventListener("DOMContentLoaded", () => {
  const outputEl = document.getElementById("output");

  // Function to display text with HTML line breaks
  function log(msg) {
    outputEl.innerHTML += msg + "<br>";
  }

  // Red heart icon
  const redHeart = '<i class="fa-solid fa-heart" style="color:red;"></i>';

  // --- TESTING VARIABLES --- //
  // Change these to test different scenarios
  let currentWeapon = "pistol";  // "knife", "pistol", "shotgun", "rifle", "flamethrower"
  let currentZombieIndex = 1;     // 0 = Walker, 1 = Runner, 2 = Brute
  // Ammo override for testing no ammo scenario (set to null for no override)
  let overrideAmmo = null; // e.g. { weapon: "pistol", ammo: 0 }

  // Player object with inventory
  const player = {
    name: "Elham",
    health: 100,
    currentWeapon: currentWeapon,
    inventory: {
      knife: { ammo: Infinity, damage: 10, icon: '<i class="fa-solid fa-utensils" style="color:silver;"></i>' },
      pistol: { ammo: 3, damage: 25, icon: '<i class="fa-solid fa-gun" style="color:gray;"></i>' },
      shotgun: { ammo: 2, damage: 50, icon: '<i class="fa-solid fa-skull-crossbones" style="color:white;"></i>' },
      rifle: { ammo: 4, damage: 40, icon: '<i class="fa-solid fa-crosshairs" style="color:orange;"></i>' },
      flamethrower: { ammo: 1, damage: 70, icon: '<i class="fa-solid fa-fire" style="color:orangered;"></i>' }
    }
  };

  // Override ammo for testing
  if (overrideAmmo && player.inventory[overrideAmmo.weapon]) {
    player.inventory[overrideAmmo.weapon].ammo = overrideAmmo.ammo;
  }

  // Zombies array
  const zombies = [
    { type: "Walker", health: 50, icon: '<i class="fa-solid fa-person-walking" style="color:green;"></i>' },
    { type: "Runner", health: 75, icon: '<i class="fa-solid fa-person-running" style="color:lime;"></i>' },
    { type: "Brute", health: 120, icon: '<i class="fa-solid fa-dumbbell" style="color:gold;"></i>' }
  ];

  // Clone the chosen zombie to avoid mutating original
  let zombie = { ...zombies[currentZombieIndex] };

  // Separator line in gray
  function separator() {
    log("<span style='color:#888;'>--------------------------------------------------</span>");
  }

  // Display initial status
  log(`<strong>Player:</strong> ${player.name} ${redHeart} <span style="color:#d33;">${player.health}</span>`);
  log(`<strong>Zombie:</strong> ${zombie.type} ${zombie.icon} ${redHeart} <span style="color:#d33;">${zombie.health}</span>`);
  separator();

  // Attack function
  function attack() {
    let weaponName = player.currentWeapon;
    let weapon = player.inventory[weaponName];

    if (weapon.ammo > 0 || weapon.ammo === Infinity) {
      log(`🗡️ Attacking with <strong>${weaponName}</strong> ${weapon.icon} (Damage: <span style="color:orange;">${weapon.damage}</span>, Ammo left: <span style="color:cyan;">${weapon.ammo === Infinity ? '∞' : weapon.ammo}</span>)`);

      // Damage zombie
      zombie.health -= weapon.damage;
      if (zombie.health < 0) zombie.health = 0;

      // Decrease ammo if not infinite
      if (weapon.ammo !== Infinity) {
        weapon.ammo--;
      }

      log(`🧟 Zombie takes <span style="color:orange;">${weapon.damage}</span> damage, health now: <span style="color:#d33;">${zombie.health}</span>`);

      // Zombie attacks back if alive
      if (zombie.health > 0) {
        player.health -= 15;
        if (player.health < 0) player.health = 0;

        log(`⚔️ Zombie attacks back! Player health: <span style="color:#d33;">${player.health}</span>`);
      }
    } else {
      if (weaponName !== "knife") {
        log(`❌ No ammo for <strong>${weaponName}</strong>! Switching to <strong>knife</strong> 🗡️...`);
        player.currentWeapon = "knife";
        attack();
      } else {
        log("❌ No ammo left to attack! Game Over.");
      }
    }
  }

  // Battle loop
  while (player.health > 0 && zombie.health > 0) {
    attack();
    separator();
  }

  // Final results
  log(`<strong>🏁 Battle Over!</strong>`);
  log(`Player final health: <span style="color:#d33;">${player.health}</span> ${redHeart}`);
  log(`Zombie final health: <span style="color:#d33;">${zombie.health}</span> ${zombie.icon}`);
});
