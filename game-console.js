document.addEventListener("DOMContentLoaded", () => {
  const outputEl = document.getElementById("output");

  function log(msg) {
    outputEl.innerHTML += msg + "<br>";
  }

  // Player setup
  const player = {
    name: "Elham",
    health: 100,
    currentWeapon: "pistol", // Change to "knife", "pistol", "shotgun"
    inventory: {
      knife: { ammo: Infinity, damage: 10, icon: '<i class="fa-solid fa-utensils"></i>' },
      pistol: { ammo: 3, damage: 25, icon: '<i class="fa-solid fa-gun"></i>' },
      shotgun: { ammo: 2, damage: 50, icon: '<i class="fa-solid fa-skull-crossbones"></i>' },
      rifle: { ammo: 4, damage: 40, icon: '<i class="fa-solid fa-crosshairs"></i>' },
      flamethrower: { ammo: 1, damage: 70, icon: '<i class="fa-solid fa-fire"></i>' }
    }
  };

  // Zombie types
  const zombies = [
    { type: "Walker", health: 50, icon: '<i class="fa-solid fa-walking"></i>' },
    { type: "Runner", health: 75, icon: '<i class="fa-solid fa-running"></i>' },
    { type: "Brute", health: 120, icon: '<i class="fa-solid fa-dumbbell"></i>' }
  ];

  // Choose a zombie to fight
  const currentZombieIndex = 1; // Change to 0, 1, or 2 for testing
  let zombie = {...zombies[currentZombieIndex]}; // کپی کنید که مقدار اصلی تغییر نکند

  log(`Player: ${player.name} ❤️ ${player.health}`);
  log(`Zombie: ${zombie.type} ${zombie.icon} ❤️ ${zombie.health}`);
  log("--------------------------------------------------");

  function attack() {
    let weapon = player.inventory[player.currentWeapon];

    if (weapon.ammo > 0 || weapon.ammo === Infinity) {
      log(`Attacking with ${player.currentWeapon} ${weapon.icon}`);

      // Player attacks zombie
      zombie.health -= weapon.damage;
      if (weapon.ammo !== Infinity) {
        weapon.ammo--;
      }
      log(`Zombie took ${weapon.damage} damage. ❤️ ${zombie.health}`);

      // Zombie attacks back if alive
      if (zombie.health > 0) {
        player.health -= 15;
        log(`Zombie attacks back! Player health: ❤️ ${player.health}`);
      }
    } else {
      log(`No ammo for ${player.currentWeapon}! Switching to knife...`);
      player.currentWeapon = "knife";
      attack();
    }
  }

  // Fight until zombie or player dies
  while (player.health > 0 && zombie.health > 0) {
    attack();
  }

  // Final status
  log("--------------------------------------------------");
  log(`Final Player Status: ❤️ ${player.health}`);
  log(`Final Zombie Status: ❤️ ${zombie.health}`);
});