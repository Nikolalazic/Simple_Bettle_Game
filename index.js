function getChance(critical) {
	const chance = Math.floor((Math.random() * 100) + 1);
	if (critical >= chance) {
		return true;
	}

	return false;
}

class Unit {
	constructor(name, health = 100, damage = 5, critChance = 10, evadeChance = 4) {
		this.name = name;
		this.health = health;
		this.damage = damage;
		this.critChance = critChance;
		this.evadeChance = evadeChance;
	}

	isAlive() {
		if (this.health > 0) {
			return true;
		}

		return false;
	}

	doDamage() {
		if (getChance(this.critChance)) {
			return this.damage * 2;
		}
		return this.damage;
	}


	receiveDamage(damage) {
		if (getChance(this.evadeChance)) {
			console.log(`${this.name} is miss. Current health ${this.health}`);
		} else {
			this.health = this.health - damage;
			console.log(`${this.name} received ${damage}. current health ${this.health}`);
		}
	}
}

class Battle {
	static startBattle() {
		const unit1 = new Unit('Pera');
		const unit2 = new Unit('Zika');
		const unit3 = new Unit('Cava', 100, 100, 1, 1);

		while (unit1.isAlive() && unit2.isAlive()) {
			unit2.receiveDamage(unit1.doDamage());
			unit1.receiveDamage(unit2.doDamage());
			if (unit2.health < unit1.health) {
				unit2.receiveDamage(unit3.doDamage());
			}
			if (unit2.health > unit1.health) {
				unit1.receiveDamage(unit3.doDamage());
			}
		}
		if (unit1.isAlive()) {
			console.log(`Winner is ${unit1.name}`);
			return true;
		}
		if (unit2.isAlive()) {
			console.log(`Winner is ${unit2.name}`);
			return true;
		}
		console.log('Everyone is dead');
		return true;
	}
}

Battle.startBattle();
