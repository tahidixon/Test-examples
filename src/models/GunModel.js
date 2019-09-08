export default class GunModel {
    constructor(bullets = 10, max_bullets = 100, bullet_velocity = 200) {
        this.bullets = bullets;
        this.max_bullets = max_bullets;
		this.bullet_velocity = bullet_velocity;
        this.lastFire = Date.now() - 500; //So that we can fire the gun
		this.machinegunEnabled = false;
		this.sniperEnabled = false;
		this.shotType = "default";
    }

    fire() {
        this.lastFire = Date.now();

        if(this.shotType == "default")
	    this.bullets -= 1;
	else if(this.shotType == "machinegun")
	    this.bullets -= 1;
	else
	    this.bullets -= 2;
    }

    canBeFired() {
		if(this.shotType == "machinegun" && this.bullets > 0 && Date.now() - this.lastFire >= 100)
			return true;
			if (Date.now() - this.lastFire >= 500) {
				if(this.shotType == "sniper" && this.bullets > 1)
					return true;
				else if (this.bullets > 0)
					return true;
				else
					return false;
			}
    }

    enableMachinegun() {
	this.machinegunEnabled = true;
    }

    enableSniper() {
	this.sniperEnabled = true;
    }

    useMachinegun() {
	if(this.machinegunEnabled)
    	    this.shotType = "machinegun";
    }
    
    useSniper() {
	if(this.sniperEnabled)
	    this.shotType = "sniper";
    }
    
    cycleWeapons() {
	if(this.getShotType() == "sniper") {
	    this.shotType = "default";
	    return; }
	if(this.getShotType() == "machinegun" && this.sniperEnabled) {
	    this.shotType = "sniper";
	    return; }
	if(this.getShotType() == "default" && this.machinegunEnabled) {
	    this.shotType = "machinegun";
	    return; }
    }
    
    getShotType() {
	return this.shotType;
    }
	add_bullets(amt) {
		this.bullets += amt;
	}
}