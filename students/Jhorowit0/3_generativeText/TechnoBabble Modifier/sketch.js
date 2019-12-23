var inp;
var modPercent;
var mp;
var button;

var nouns = ['nanotubes','regenerator','diffuser','manifold','atomizer','vectors',
,'Reaction','stabilizers','flux','spin-vector','substitution','radians','2-Pi','flow-length',
'progressions','discriminator','synthesizer','system','tensor','harmonizer','deharmonizer','slag'
,'optics','router','particle engagement system','module','lattice','oscillator','subwave','dampener'
,'Bellman-Ford','loop','actualization','tuner','hydroxide','projections','coils','filament','thermowafers'];


var verbs = ['instantiate', 'peel'];
var adjs = ['Bi-Carbon','yttrium-77','type-7','2nd gen','cracked','polarized','Firmi-Ginzburg',
'Sub-Theta','Voynichian','negative','radionic','baryonic','theoretical','Q-wave','T-band'
,'modular','5MU','tri-delta','quantum','gamma','optical','Goergen','QBC','subwave','compressed'
,'standard','degaussing','unistat','ionized','fractal','CRJ300','neutrino'];

function setup() {
  inp = createInput('text here');
  //inp.changed(myInputEvent);
  //modPercent.changed(updatePercent);
  modPercent = createInput('25');
  modPercent.size(25);
  button = createButton('Enter');
  button.mousePressed(myInputEvent);
}

function myInputEvent() {
    mp = modPercent.value();
    var s = inp.value();
    var rs = new RiString(s);
    wrds = RiTa.tokenize(s);
    createP(replaceN(wrds, mp));
}

function replaceN(words, chance){ //this function will replace a
  for(var i = 0; i < words.length; i++){
    if(random(100) <= chance){
      if(RiTa.isNoun(words[i])) words[i] = random(nouns);
      //else if(RiTa.isVerb(words[i])) words[i] = random(verbs);
      else if(RiTa.isAdjective(words[i])) words[i] = random(adjs);
    }
  }
  return RiTa.untokenize(words);
}
