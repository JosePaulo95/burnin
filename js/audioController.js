let bg_audios = [];
bg_audios.push(new Audio('audio/music/jobin-cena1.ogg'));
bg_audios.push(new Audio('audio/music/jobin-cena2.ogg'));
bg_audios.push(new Audio('audio/music/jobin-cena3.ogg'));
bg_audios.push(new Audio('audio/music/jobin-cena1.ogg'));

let beep_audios = [];
beep_audios["grab"] = new Audio('audio/kenney_interfacesounds/Audio/select_002.ogg');
beep_audios["click"] = new Audio('audio/kenney_interfacesounds/Audio/click_003.ogg');
beep_audios["scratch"] = new Audio('audio/kenney_interfacesounds/Audio/scratch_004.ogg');



let AudioController = {
	playSound: function (index) {
		bg_audios[index].addEventListener('ended', function() {
			this.currentTime = 0;
			this.play();
		}, false);
		bg_audios[index].play();
	},
	stop: function () {
		bg_audios.map(a => a.pause())
	},
	playBeep: function (key) {
		beep_audios[key].volume = 1
		beep_audios[key].play();
	},
}
