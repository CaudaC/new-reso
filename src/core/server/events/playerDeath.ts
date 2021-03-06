import * as alt from 'alt-server';
import { playerFuncs } from '../extensions/Player';

alt.on('playerDeath', handleDeath);

function handleDeath(player: alt.Player, killer: alt.Entity, weaponHash: any): void {
    if (player && player.valid) {
        if (player.vehicle) {
            player.pos = player.vehicle.pos;
        }

        // Leave this timeout.
        // It prevents a crash when a player smashes into a gas station with a car.
        // Seemingly random I know, but that's just how it fixed.
        alt.setTimeout(() => {
            playerFuncs.set.dead(player, weaponHash);
        }, 1500);
    }

    if (killer instanceof alt.Player && player !== killer) {
        alt.log(`(${player.id}) ${player.data.name} killed by ${killer.data.name}.`);
    }

    if (killer instanceof alt.Player && player === killer) {
        alt.log(`(${player.id}) ${player.data.name} died.`);
    }

    if (killer instanceof alt.Vehicle && killer.driver) {
        alt.log(`(${player.id}) ${player.data.name} was killed in vehicular combat by ${killer.driver.data.name}`);
    }

    if (killer instanceof alt.Vehicle && !killer.driver) {
        alt.log(`(${player.id}) ${player.data.name} killed themself in a vehicular incident.`);
    }
}
