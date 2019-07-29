<template>
  <div>
    <p>In Enchanted Stones, you play as a sorcerer that controls a magic dueling rock. The goal of the game is to reduce your opponents life total to zero, while playing and countering spells that alter movement.</p>

    <h2>Turn Structure</h2>
    Each turn consists of three phases. During each phase you must declare an action: pass, move, attack, or play a spell. Every action you declare goes onto the "stack". Every time you declare an action, priority is passed to your opponent and they have the option to either play a spell or pass priority back to you. When priority is passed twice in a row the stack is resolved in a LIFO (last in, first out) fashion, similar to Magic: the Gathering (see below for more detail).

    <h2>Spells</h2>
    Throughout the game, you are able to play up to eight spells. Once a spell is played, it is removed from your hand and you cannot play it again. The spells available to you are:

    Confusion: Your opponent cannot play a spell during their next turn.

    Teleport: Move your opponent back to the square they occupied previously.

    Retreat: Move to the square you occupied previously.

    Stutter: You and your opponent move to the square you occipied previously.

    Time Warp: You and your opponent move back to the space you occupied on the beginning of your first turn.

    Counter attack: Attacks opponent back, but still take damage.

    Block: Negates an attack on the stack.

    Counter Spell: Negates a spell on the stack.

    <h2>The Stack</h2>
    The stack is resolved in a LIFO (Last In, First Out) fashion.

    This means that if a phase goes like so:

    You declare an attack on your opponent.
    Your opponent plays Counter Attack in response.
    You play Counter Spell in response to their Counter Attack.
    The result is this:

    Your Counter Spell resolves and negates your opponents Counter Attack (it's removed from the stack).
    Your attack resolves and your opponent loses one life.
    <button><router-link to="/"> Home</router-link></button>
  </div>
</template>

<script>

export default {
}
</script>

<style>

</style>
