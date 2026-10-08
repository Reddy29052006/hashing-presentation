/**
 * ============================================================================
 * HASHING IN DATA STRUCTURES - PRESENTATION ENGINE & STORYTELLING CONTROLLER
 * Interactive educational experience for classroom projection
 * ============================================================================
 */
//dcasdfa
// ============================================================================
// LEVEL 1 CONTROLLER (Real-life EAMCET Counselling & Linear Search)
// ============================================================================
const Level1Controller = {
  currentStep: 1,
  totalSteps: 3,
  isSearching: false,
  searchTimer: null,

  documents: [
    { id: 'doc-1', tagId: 'tag-1', name: 'Aadhaar Card', isTarget: false, xPos: '10%' },
    { id: 'doc-2', tagId: 'tag-2', name: 'College TC', isTarget: false, xPos: '30%' },
    { id: 'doc-3', tagId: 'tag-3', name: '12th Mark Memo', isTarget: false, xPos: '50%' },
    { id: 'doc-4', tagId: 'tag-4', name: '10th Mark Memo', isTarget: true, xPos: '70%' },
    { id: 'doc-5', tagId: 'tag-5', name: 'Bank Docs', isTarget: false, xPos: '90%' }
  ],

  init() {
    this.reset();
  },

  reset() {
    if (this.searchTimer) {
      clearTimeout(this.searchTimer);
      this.searchTimer = null;
    }
    this.isSearching = false;
    this.currentStep = 1;

    // Reset document cards visual state
    this.documents.forEach((doc, idx) => {
      const el = document.getElementById(doc.id);
      if (el) {
        el.className = doc.isTarget ? 'doc-card target-card' : 'doc-card';
      }
      const tag = document.getElementById(doc.tagId);
      if (tag) {
        tag.className = 'doc-status-tag status-idle';
        tag.innerHTML = doc.isTarget
          ? '<span class="status-icon">⚪</span> Target Document'
          : '<span class="status-icon">⚪</span> Waiting';
      }
    });

    // Reset pointer
    const pointer = document.getElementById('searchPointer');
    if (pointer) {
      pointer.className = 'search-pointer';
      pointer.style.left = '10%';
      const badge = document.getElementById('pointerBadge');
      if (badge) badge.innerText = 'CHECKING THIS';
    }

    // Reset live indicator
    const liveIndicator = document.getElementById('liveScanIndicator');
    const liveText = document.getElementById('liveScanText');
    if (liveIndicator) liveIndicator.classList.remove('active');
    if (liveText) liveText.innerText = 'Ready to search';

    // Reset story cards
    const questionCard = document.getElementById('discovery-question-card');
    const searchingCard = document.getElementById('discovery-searching-card');
    const conceptCard = document.getElementById('discovery-concept-card');
    if (questionCard) questionCard.classList.remove('hidden');
    if (searchingCard) searchingCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.add('hidden');

    // Update main presentation stepper
    PresentationApp.updateStepTracker(1, 3);
    PresentationApp.updateNotesStep(1);
  },

  startSearchAnimation() {
    if (this.isSearching) return;
    this.isSearching = true;

    // Advance step
    this.currentStep = 2;
    PresentationApp.updateStepTracker(2, 3);
    PresentationApp.updateNotesStep(2);

    // Switch story card to live progress
    const questionCard = document.getElementById('discovery-question-card');
    const searchingCard = document.getElementById('discovery-searching-card');
    const conceptCard = document.getElementById('discovery-concept-card');
    if (questionCard) questionCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.add('hidden');
    if (searchingCard) searchingCard.classList.remove('hidden');

    // Activate live indicator
    const liveIndicator = document.getElementById('liveScanIndicator');
    const liveText = document.getElementById('liveScanText');
    if (liveIndicator) liveIndicator.classList.add('active');
    if (liveText) liveText.innerText = 'Searching file one by one...';

    // Show pointer
    const pointer = document.getElementById('searchPointer');
    if (pointer) pointer.classList.add('visible');

    // Begin sequential inspection from Document 1
    this.inspectSequence(0);
  },

  inspectSequence(index) {
    if (index >= 4) return;

    const doc = this.documents[index];
    const docEl = document.getElementById(doc.id);
    const tagEl = document.getElementById(doc.tagId);
    const pointer = document.getElementById('searchPointer');
    const liveDetail = document.getElementById('liveSearchDetail');
    const countDisplay = document.getElementById('checksCountDisplay');

    // Move pointer to this card
    if (pointer) pointer.style.left = doc.xPos;

    // Highlight card as inspecting
    if (docEl) docEl.classList.add('card-inspecting');
    if (tagEl) {
      tagEl.className = 'doc-status-tag status-checking';
      tagEl.innerHTML = '<span class="status-icon">🔍</span> Checking...';
    }

    if (liveDetail) {
      liveDetail.innerText = `Checking Document 0${index + 1}: ${doc.name}...`;
    }
    if (countDisplay) {
      countDisplay.innerText = `Checking ${index + 1} of 4`;
    }

    // Inspection delay for audience to clearly follow
    this.searchTimer = setTimeout(() => {
      if (doc.isTarget) {
        // TARGET FOUND! (Doc 4)
        if (docEl) {
          docEl.classList.remove('card-inspecting');
          docEl.classList.add('card-found-winner');
        }
        if (tagEl) {
          tagEl.className = 'doc-status-tag status-found';
          tagEl.innerHTML = '<span class="status-icon">🏆</span> FOUND IT! ✔';
        }
        const badge = document.getElementById('pointerBadge');
        if (badge) badge.innerText = '🏆 FOUND!';

        if (liveDetail) {
          liveDetail.innerText = 'Target Found: 10th Class Mark Memo! 🎉';
        }
        const liveText = document.getElementById('liveScanText');
        if (liveText) liveText.innerText = 'Target Located!';

        // Transition to Concept Discovery
        this.searchTimer = setTimeout(() => {
          this.showConclusion();
        }, 1200);

      } else {
        // NOT TARGET (Doc 1, 2, 3)
        if (docEl) {
          docEl.classList.remove('card-inspecting');
          docEl.classList.add('card-discarded');
        }
        if (tagEl) {
          tagEl.className = 'doc-status-tag status-rejected';
          tagEl.innerHTML = '<span class="status-icon">❌</span> Not 10th Memo';
        }

        // Move to next document
        this.searchTimer = setTimeout(() => {
          this.inspectSequence(index + 1);
        }, 850);
      }
    }, 900);
  },

  showConclusion() {
    this.isSearching = false;
    this.currentStep = 3;
    PresentationApp.updateStepTracker(3, 3);
    PresentationApp.updateNotesStep(3);

    // Hide pointer
    const pointer = document.getElementById('searchPointer');
    if (pointer) pointer.classList.remove('visible');

    // Switch story card to Concept Banner
    document.getElementById('discovery-searching-card').classList.add('hidden');
    document.getElementById('discovery-concept-card').classList.remove('hidden');

    const liveIndicator = document.getElementById('liveScanIndicator');
    const liveText = document.getElementById('liveScanText');
    if (liveIndicator) liveIndicator.classList.remove('active');
    if (liveText) liveText.innerText = 'Search Completed';
  },

  handleNext() {
    if (this.currentStep === 1) {
      this.startSearchAnimation();
    } else if (this.currentStep === 2) {
      if (!this.isSearching) {
        this.showConclusion();
      }
    } else if (this.currentStep === 3) {
      PresentationApp.nextStage();
    }
  },

  handlePrev() {
    if (this.currentStep > 1) {
      this.reset();
    }
  }
};

// ============================================================================
// LEVEL 2 CONTROLLER (Identify the Problem: 1 Lakh Documents)
// ============================================================================
const Level2Controller = {
  currentStep: 1,
  totalSteps: 3,
  isScanning: false,
  scanInterval: null,
  finishTimeout: null,
  TOTAL_DOCS: 100000,
  TOTAL_TILES: 400,
  SCAN_DURATION: 7000,

  init() {
    const grid = document.getElementById('l2TileGrid');
    if (grid && grid.childElementCount === 0) {
      const frag = document.createDocumentFragment();
      for (let i = 0; i < this.TOTAL_TILES; i++) {
        const tile = document.createElement('div');
        tile.className = 'l2-tile';
        frag.appendChild(tile);
      }
      grid.appendChild(frag);
    }
    this.reset();
  },

  reset() {
    this.stopTimers();
    this.isScanning = false;
    this.currentStep = 1;

    const grid = document.getElementById('l2TileGrid');
    if (grid) {
      grid.querySelectorAll('.l2-tile').forEach(t => { t.className = 'l2-tile'; });
    }

    const fill = document.getElementById('l2ProgressFill');
    if (fill) fill.style.width = '0%';
    const checked = document.getElementById('l2CheckedLabel');
    if (checked) checked.innerText = 'Checked 0 of 1,00,000';
    const chip = document.getElementById('l2TimeChip');
    if (chip) chip.innerText = '1 document = 1 second';

    const indicator = document.getElementById('l2ScanIndicator');
    const status = document.getElementById('l2ScanStatus');
    if (indicator) indicator.classList.remove('active');
    if (status) status.innerText = 'Ready to scan';

    const questionCard = document.getElementById('l2-question-card');
    const scanningCard = document.getElementById('l2-scanning-card');
    const conceptCard = document.getElementById('l2-concept-card');
    if (questionCard) questionCard.classList.remove('hidden');
    if (scanningCard) scanningCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.add('hidden');

    PresentationApp.updateStepTracker(1, 3);
    PresentationApp.updateNotesStep(1);
  },

  stopTimers() {
    if (this.scanInterval) {
      clearInterval(this.scanInterval);
      this.scanInterval = null;
    }
    if (this.finishTimeout) {
      clearTimeout(this.finishTimeout);
      this.finishTimeout = null;
    }
  },

  formatTime(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  },

  startScan() {
    if (this.isScanning) return;
    this.isScanning = true;
    this.currentStep = 2;
    PresentationApp.updateStepTracker(2, 3);
    PresentationApp.updateNotesStep(2);

    const questionCard = document.getElementById('l2-question-card');
    const scanningCard = document.getElementById('l2-scanning-card');
    const conceptCard = document.getElementById('l2-concept-card');
    if (questionCard) questionCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.add('hidden');
    if (scanningCard) scanningCard.classList.remove('hidden');

    const indicator = document.getElementById('l2ScanIndicator');
    const status = document.getElementById('l2ScanStatus');
    if (indicator) indicator.classList.add('active');
    if (status) status.innerText = 'Scanning 1,00,000 documents...';

    const startTime = Date.now();
    const tiles = Array.from(document.querySelectorAll('#l2TileGrid .l2-tile'));
    let litCount = 0;

    this.scanInterval = setInterval(() => {
      const p = Math.min((Date.now() - startTime) / this.SCAN_DURATION, 1);
      const checked = Math.round(p * this.TOTAL_DOCS);
      const elapsed = this.formatTime(checked);

      const fill = document.getElementById('l2ProgressFill');
      if (fill) fill.style.width = (p * 100).toFixed(2) + '%';

      const checkedLabel = document.getElementById('l2CheckedLabel');
      if (checkedLabel) checkedLabel.innerText = `Checked ${checked.toLocaleString('en-IN')} of 1,00,000`;

      const chip = document.getElementById('l2TimeChip');
      if (chip) chip.innerText = `Time spent: ${elapsed}`;

      const detail = document.getElementById('l2ScanDetail');
      if (detail) detail.innerText = `Checking documents one by one... ${(p * 100).toFixed(1)}% done`;

      const eta = document.getElementById('l2EtaDisplay');
      if (eta) eta.innerText = `${elapsed} wasted so far`;

      const targetTiles = Math.floor(p * this.TOTAL_TILES);
      while (litCount < targetTiles && litCount < tiles.length) {
        tiles[litCount].classList.add('scanned');
        litCount++;
      }

      if (p >= 1) {
        this.stopTimers();
        this.isScanning = false;

        if (status) status.innerText = 'Waste of time confirmed!';
        if (detail) detail.innerText = 'Total time lost: 27 hours 46 minutes! 😰';
        if (eta) eta.innerText = '1,00,000 checks = 27h 46m';
        if (chip) chip.innerText = 'Time spent: 27h 46m 40s';

        this.finishTimeout = setTimeout(() => {
          this.finishTimeout = null;
          this.showConclusion();
        }, 1400);
      }
    }, 40);
  },

  showConclusion() {
    this.stopTimers();
    this.isScanning = false;
    this.currentStep = 3;
    PresentationApp.updateStepTracker(3, 3);
    PresentationApp.updateNotesStep(3);

    const scanningCard = document.getElementById('l2-scanning-card');
    const conceptCard = document.getElementById('l2-concept-card');
    if (scanningCard) scanningCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.remove('hidden');

    const indicator = document.getElementById('l2ScanIndicator');
    const status = document.getElementById('l2ScanStatus');
    if (indicator) indicator.classList.remove('active');
    if (status) status.innerText = 'Better way needed';
  },

  handleNext() {
    if (this.currentStep === 1) {
      this.startScan();
    } else if (this.currentStep === 2) {
      this.showConclusion();
    } else if (this.currentStep === 3) {
      PresentationApp.nextStage();
    }
  },

  handlePrev() {
    if (this.currentStep > 1) {
      this.reset();
    }
  }
};

// ============================================================================
// LEVEL 3 CONTROLLER (What is Hashing? — Definition & Mapping Demo)
// ============================================================================
const Level3Controller = {
  currentStep: 1,
  totalSteps: 3,
  isMapping: false,
  timers: [],
  sources: [
    { id: 'l3Src-1', slot: 2, icon: '🪪', name: 'Aadhaar', key: '8891' },
    { id: 'l3Src-2', slot: 9, icon: '🎓', name: 'Hall Ticket', key: '4027' },
    { id: 'l3Src-3', slot: 5, icon: '📜', name: 'Mark Memo', key: '1357' },
    { id: 'l3Src-4', slot: 0, icon: '🏦', name: 'Passbook', key: '2468' }
  ],

  init() {
    this.reset();
  },

  clearTimers() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
  },

  later(fn, ms) {
    const t = setTimeout(fn, ms);
    this.timers.push(t);
    return t;
  },

  reset() {
    this.clearTimers();
    this.isMapping = false;
    this.currentStep = 1;

    this.sources.forEach(src => {
      const el = document.getElementById(src.id);
      if (el) el.className = 'l3-src-doc';
      const slot = document.getElementById('l3Slot-' + src.slot);
      if (slot) {
        slot.classList.remove('filled');
        const fill = slot.querySelector('.l3-slot-fill');
        if (fill) fill.innerText = '';
      }
    });

    const box = document.getElementById('l3HashBox');
    if (box) box.classList.remove('active', 'zap');

    const indicator = document.getElementById('l3ScanIndicator');
    const status = document.getElementById('l3ScanStatus');
    if (indicator) indicator.classList.remove('active');
    if (status) status.innerText = 'Waiting for keys';

    const caption = document.getElementById('l3LabCaption');
    if (caption) caption.innerText = 'Waiting: drop the keys into the machine…';

    const count = document.getElementById('l3MapCount');
    if (count) count.innerText = '0 of 4 placed';

    const questionCard = document.getElementById('l3-question-card');
    const mappingCard = document.getElementById('l3-mapping-card');
    const conceptCard = document.getElementById('l3-concept-card');
    if (questionCard) questionCard.classList.remove('hidden');
    if (mappingCard) mappingCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.add('hidden');

    PresentationApp.updateStepTracker(1, 3);
    PresentationApp.updateNotesStep(1);
  },

  startMapping() {
    if (this.isMapping) return;
    this.isMapping = true;
    this.currentStep = 2;
    PresentationApp.updateStepTracker(2, 3);
    PresentationApp.updateNotesStep(2);

    const questionCard = document.getElementById('l3-question-card');
    const mappingCard = document.getElementById('l3-mapping-card');
    const conceptCard = document.getElementById('l3-concept-card');
    if (questionCard) questionCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.add('hidden');
    if (mappingCard) mappingCard.classList.remove('hidden');

    const indicator = document.getElementById('l3ScanIndicator');
    const status = document.getElementById('l3ScanStatus');
    if (indicator) indicator.classList.add('active');
    if (status) status.innerText = 'Mapping keys to locations...';

    const box = document.getElementById('l3HashBox');
    if (box) box.classList.add('active');

    this.sources.forEach((src, i) => {
      this.later(() => {
        const el = document.getElementById(src.id);
        const detail = document.getElementById('l3MapDetail');
        const caption = document.getElementById('l3LabCaption');
        if (el) el.classList.add('active');
        if (detail) detail.innerText = `Key ${src.key} (${src.name}) → Hash Function...`;
        if (caption) caption.innerText = `⚙️ Key ${src.key} enters the hash function...`;
        if (box) {
          box.classList.add('zap');
          this.later(() => box.classList.remove('zap'), 450);
        }

        this.later(() => {
          if (el) {
            el.classList.remove('active');
            el.classList.add('done');
          }
          const slot = document.getElementById('l3Slot-' + src.slot);
          if (slot) {
            slot.classList.add('filled');
            const fill = slot.querySelector('.l3-slot-fill');
            if (fill) fill.innerText = src.icon;
          }
          if (detail) detail.innerText = `${src.name} placed directly in Slot ${src.slot}! No scanning.`;
          if (caption) caption.innerText = `📍 ${src.name} (key ${src.key}) → Slot ${src.slot} — placed directly!`;
          const count = document.getElementById('l3MapCount');
          if (count) count.innerText = `${i + 1} of 4 placed`;
        }, 500);
      }, 400 + i * 1050);
    });

    const lastStepDone = 400 + 3 * 1050 + 500;
    this.later(() => {
      this.isMapping = false;
      if (status) status.innerText = 'All keys mapped!';
      const detail = document.getElementById('l3MapDetail');
      if (detail) detail.innerText = '4 of 4 placed — zero scanning needed!';
      const caption = document.getElementById('l3LabCaption');
      if (caption) caption.innerText = '✅ Every key knew its home slot — no document was scanned!';
      this.later(() => this.showConcept(), 1500);
    }, lastStepDone);
  },

  showConcept() {
    this.clearTimers();
    this.isMapping = false;
    this.currentStep = 3;
    PresentationApp.updateStepTracker(3, 3);
    PresentationApp.updateNotesStep(3);

    const mappingCard = document.getElementById('l3-mapping-card');
    const conceptCard = document.getElementById('l3-concept-card');
    if (mappingCard) mappingCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.remove('hidden');

    const indicator = document.getElementById('l3ScanIndicator');
    const status = document.getElementById('l3ScanStatus');
    if (indicator) indicator.classList.remove('active');
    if (status) status.innerText = 'Direct placement done';

    const box = document.getElementById('l3HashBox');
    if (box) box.classList.remove('active', 'zap');
  },

  handleNext() {
    if (this.currentStep === 1) {
      this.startMapping();
    } else if (this.currentStep === 2) {
      this.showConcept();
    } else if (this.currentStep === 3) {
      PresentationApp.nextStage();
    }
  },

  handlePrev() {
    if (this.currentStep > 1) {
      this.reset();
    }
  }
};

// ============================================================================
// LEVEL 4 CONTROLLER (What is a Key? — Identical Cards, Unique Numbers)
// ============================================================================
const Level4Controller = {
  currentStep: 1,
  totalSteps: 3,
  isRevealing: false,
  timers: [],
  records: [
    { recId: 'l4Rec-1', keyId: 'l4Key-1', number: 'XXXX-4402', mine: false },
    { recId: 'l4Rec-2', keyId: 'l4Key-2', number: 'XXXX-8891', mine: true },
    { recId: 'l4Rec-3', keyId: 'l4Key-3', number: 'XXXX-7735', mine: false },
    { recId: 'l4Rec-4', keyId: 'l4Key-4', number: 'XXXX-1120', mine: false }
  ],

  init() {
    this.reset();
  },

  clearTimers() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
  },

  later(fn, ms) {
    const t = setTimeout(fn, ms);
    this.timers.push(t);
    return t;
  },

  reset() {
    this.clearTimers();
    this.isRevealing = false;
    this.currentStep = 1;

    this.records.forEach(rec => {
      const card = document.getElementById(rec.recId);
      if (card) card.className = 'l4-rec';
      const key = document.getElementById(rec.keyId);
      if (key) key.innerText = '????';
    });

    const legend = document.getElementById('l4Legend');
    if (legend) legend.classList.remove('show');

    const indicator = document.getElementById('l4ScanIndicator');
    const status = document.getElementById('l4ScanStatus');
    if (indicator) indicator.classList.remove('active');
    if (status) status.innerText = 'Numbers hidden';

    const caption = document.getElementById('l4LabCaption');
    if (caption) caption.innerText = 'Tap “Reveal the Numbers” — looks alone can\'t tell records apart.';

    const count = document.getElementById('l4RevealCount');
    if (count) count.innerText = '0 of 4 revealed';

    const questionCard = document.getElementById('l4-question-card');
    const revealCard = document.getElementById('l4-reveal-card');
    const conceptCard = document.getElementById('l4-concept-card');
    if (questionCard) questionCard.classList.remove('hidden');
    if (revealCard) revealCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.add('hidden');

    PresentationApp.updateStepTracker(1, 3);
    PresentationApp.updateNotesStep(1);
  },

  startReveal() {
    if (this.isRevealing) return;
    this.isRevealing = true;
    this.currentStep = 2;
    PresentationApp.updateStepTracker(2, 3);
    PresentationApp.updateNotesStep(2);

    const questionCard = document.getElementById('l4-question-card');
    const revealCard = document.getElementById('l4-reveal-card');
    const conceptCard = document.getElementById('l4-concept-card');
    if (questionCard) questionCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.add('hidden');
    if (revealCard) revealCard.classList.remove('hidden');

    const indicator = document.getElementById('l4ScanIndicator');
    const status = document.getElementById('l4ScanStatus');
    if (indicator) indicator.classList.add('active');
    if (status) status.innerText = 'Revealing numbers...';

    this.records.forEach((rec, i) => {
      this.later(() => {
        const card = document.getElementById(rec.recId);
        const key = document.getElementById(rec.keyId);
        const detail = document.getElementById('l4RevealDetail');
        const caption = document.getElementById('l4LabCaption');

        if (card) card.classList.add('revealed');
        if (key) key.innerText = rec.number;
        if (detail) detail.innerText = `Card ${i + 1}: number is ${rec.number}`;

        if (rec.mine) {
          if (card) card.classList.add('mine');
          if (detail) detail.innerText = `${rec.number} — THAT'S YOURS! 🎯`;
          if (caption) caption.innerText = `🎯 Card ${i + 1} = ${rec.number} — YOUR Aadhaar!`;
          if (status) status.innerText = 'Yours identified!';
        } else {
          if (caption) caption.innerText = `Card ${i + 1}: ${rec.number} — not yours. Keep looking…`;
        }

        const count = document.getElementById('l4RevealCount');
        if (count) count.innerText = `${i + 1} of 4 revealed`;
      }, 400 + i * 950);
    });

    const lastStepDone = 400 + 3 * 950;
    this.later(() => {
      this.isRevealing = false;
      const legend = document.getElementById('l4Legend');
      if (legend) legend.classList.add('show');
      const detail = document.getElementById('l4RevealDetail');
      if (detail) detail.innerText = 'The number IS the key — for every record type!';
      const caption = document.getElementById('l4LabCaption');
      if (caption) caption.innerText = '🗝️ The unique number = the KEY. Looks can lie; keys never do!';
      this.later(() => this.showConcept(), 1600);
    }, lastStepDone);
  },

  showConcept() {
    this.clearTimers();
    this.isRevealing = false;
    this.currentStep = 3;
    PresentationApp.updateStepTracker(3, 3);
    PresentationApp.updateNotesStep(3);

    const revealCard = document.getElementById('l4-reveal-card');
    const conceptCard = document.getElementById('l4-concept-card');
    if (revealCard) revealCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.remove('hidden');

    const indicator = document.getElementById('l4ScanIndicator');
    const status = document.getElementById('l4ScanStatus');
    if (indicator) indicator.classList.remove('active');
    if (status) status.innerText = 'Key identified';
  },

  handleNext() {
    if (this.currentStep === 1) {
      this.startReveal();
    } else if (this.currentStep === 2) {
      this.showConcept();
    } else if (this.currentStep === 3) {
      PresentationApp.nextStage();
    }
  },

  handlePrev() {
    if (this.currentStep > 1) {
      this.reset();
    }
  }
};

// ============================================================================
// LEVEL 5 CONTROLLER (The Hash Function — Key 1234 → Location 4)
// ============================================================================
const Level5Controller = {
  currentStep: 1,
  totalSteps: 3,
  isCalculating: false,
  timers: [],
  TARGET_SLOT: 4,

  init() {
    this.reset();
  },

  clearTimers() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
  },

  later(fn, ms) {
    const t = setTimeout(fn, ms);
    this.timers.push(t);
    return t;
  },

  reset() {
    this.clearTimers();
    this.isCalculating = false;
    this.currentStep = 1;

    const keycard = document.getElementById('l5KeyCard');
    if (keycard) keycard.className = 'l5-keycard';

    const box = document.getElementById('l5HashBox');
    if (box) box.classList.remove('active', 'zap');

    const slot = document.getElementById('l5Slot-' + this.TARGET_SLOT);
    if (slot) {
      slot.classList.remove('filled', 'hit');
      const fill = slot.querySelector('.l3-slot-fill');
      if (fill) fill.innerText = '';
    }

    const display = document.getElementById('l5CalcDisplay');
    if (display) display.innerText = '1234 → ? → ?';

    const indicator = document.getElementById('l5ScanIndicator');
    const status = document.getElementById('l5ScanStatus');
    if (indicator) indicator.classList.remove('active');
    if (status) status.innerText = 'Waiting for the key';

    const caption = document.getElementById('l5LabCaption');
    if (caption) caption.innerText = 'Press “Run the Hash Function” — the calculation will decide the location.';

    const phase = document.getElementById('l5CalcPhase');
    if (phase) phase.innerText = 'STORING';

    const questionCard = document.getElementById('l5-question-card');
    const calcCard = document.getElementById('l5-calc-card');
    const conceptCard = document.getElementById('l5-concept-card');
    if (questionCard) questionCard.classList.remove('hidden');
    if (calcCard) calcCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.add('hidden');

    PresentationApp.updateStepTracker(1, 3);
    PresentationApp.updateNotesStep(1);
  },

  startCalc() {
    if (this.isCalculating) return;
    this.isCalculating = true;
    this.currentStep = 2;
    PresentationApp.updateStepTracker(2, 3);
    PresentationApp.updateNotesStep(2);

    const questionCard = document.getElementById('l5-question-card');
    const calcCard = document.getElementById('l5-calc-card');
    const conceptCard = document.getElementById('l5-concept-card');
    if (questionCard) questionCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.add('hidden');
    if (calcCard) calcCard.classList.remove('hidden');

    const indicator = document.getElementById('l5ScanIndicator');
    const status = document.getElementById('l5ScanStatus');
    if (indicator) indicator.classList.add('active');
    if (status) status.innerText = 'Calculating...';

    const keycard = document.getElementById('l5KeyCard');
    const box = document.getElementById('l5HashBox');
    const display = document.getElementById('l5CalcDisplay');
    const slot = document.getElementById('l5Slot-' + this.TARGET_SLOT);
    const fill = slot ? slot.querySelector('.l3-slot-fill') : null;
    const caption = document.getElementById('l5LabCaption');
    const detail = document.getElementById('l5CalcDetail');
    const phase = document.getElementById('l5CalcPhase');

    // --- BEAT 1: STORE ---
    this.later(() => {
      if (keycard) keycard.classList.add('active');
      if (box) box.classList.add('active');
      if (display) display.innerText = '1234 → … → ?';
      if (caption) caption.innerText = '🔑 Key 1234 enters the hash function...';
      if (detail) detail.innerText = 'Performing calculation on key 1234...';
      if (phase) phase.innerText = 'STORING';
    }, 300);

    this.later(() => {
      if (box) {
        box.classList.add('zap');
        this.later(() => box.classList.remove('zap'), 450);
      }
      if (display) display.innerText = '1234 → … → 4';
      if (caption) caption.innerText = '⚙️ Calculation says: LOCATION 4!';
    }, 1400);

    this.later(() => {
      if (slot) slot.classList.add('filled');
      if (fill) fill.innerText = '🪪';
      if (keycard) {
        keycard.classList.remove('active');
        keycard.classList.add('done');
      }
      if (caption) caption.innerText = '📍 “Keep this document at location 4.”';
      if (detail) detail.innerText = 'Document stored at Location 4!';
      if (phase) phase.innerText = 'STORED ✔';
      if (status) status.innerText = 'Stored at location 4';
    }, 2300);

    // --- BEAT 2: RETRIEVE ---
    this.later(() => {
      if (keycard) {
        keycard.classList.remove('done');
        keycard.classList.add('active');
      }
      if (display) display.innerText = '1234 → … → ?';
      if (caption) caption.innerText = '🔁 Next time I need it — same key, same calculation again...';
      if (detail) detail.innerText = 'Retrieving: run the SAME calculation on 1234...';
      if (phase) phase.innerText = 'RETRIEVING';
      if (status) status.innerText = 'Calculating again...';
    }, 4300);

    this.later(() => {
      if (box) {
        box.classList.add('zap');
        this.later(() => box.classList.remove('zap'), 450);
      }
      if (display) display.innerText = '1234 → … → 4';
      if (slot) slot.classList.add('hit');
      if (caption) caption.innerText = '⚙️ Same calculation → position 4 again!';
    }, 5400);

    this.later(() => {
      if (keycard) {
        keycard.classList.remove('active');
        keycard.classList.add('done');
      }
      if (caption) caption.innerText = '🎯 Jump straight to Location 4 — found instantly, zero scanning!';
      if (detail) detail.innerText = 'Found at Location 4 — direct jump, no scanning!';
      if (phase) phase.innerText = '1 JUMP ✔';
      if (status) status.innerText = 'Direct hit!';
      this.isCalculating = false;
      this.later(() => this.showConcept(), 1600);
    }, 6300);
  },

  showConcept() {
    this.clearTimers();
    this.isCalculating = false;
    this.currentStep = 3;
    PresentationApp.updateStepTracker(3, 3);
    PresentationApp.updateNotesStep(3);

    const calcCard = document.getElementById('l5-calc-card');
    const conceptCard = document.getElementById('l5-concept-card');
    if (calcCard) calcCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.remove('hidden');

    const indicator = document.getElementById('l5ScanIndicator');
    const status = document.getElementById('l5ScanStatus');
    if (indicator) indicator.classList.remove('active');
    if (status) status.innerText = 'Direct hit!';

    const box = document.getElementById('l5HashBox');
    if (box) box.classList.remove('active', 'zap');
    const slot = document.getElementById('l5Slot-' + this.TARGET_SLOT);
    if (slot) slot.classList.remove('hit');
    const keycard = document.getElementById('l5KeyCard');
    if (keycard) {
      keycard.classList.remove('active');
      keycard.classList.add('done');
    }
  },

  handleNext() {
    if (this.currentStep === 1) {
      this.startCalc();
    } else if (this.currentStep === 2) {
      this.showConcept();
    } else if (this.currentStep === 3) {
      PresentationApp.nextStage();
    }
  },

  handlePrev() {
    if (this.currentStep > 1) {
      this.reset();
    }
  }
};

// ============================================================================
// LEVEL 6 CONTROLLER (The Hash Table — Key 1234 → Index 4 → Document Stored)
// ============================================================================
const Level6Controller = {
  currentStep: 1,
  totalSteps: 3,
  isRunning: false,
  timers: [],
  TARGET_ROW: 4,
  DOC_LABEL: '📄 Aadhaar · 1234',

  init() {
    this.reset();
  },

  clearTimers() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
  },

  later(fn, ms) {
    const t = setTimeout(fn, ms);
    this.timers.push(t);
    return t;
  },

  reset() {
    this.clearTimers();
    this.isRunning = false;
    this.currentStep = 1;

    const src = document.getElementById('l6SrcDoc');
    if (src) src.className = 'l6-srcdoc';
    const srcState = document.getElementById('l6SrcState');
    if (srcState) srcState.innerText = 'READY';

    const box = document.getElementById('l6HashBox');
    if (box) box.classList.remove('active', 'zap');

    const display = document.getElementById('l6CalcDisplay');
    if (display) display.innerText = '1234 → ? → ?';

    const row = document.getElementById('l6Row-' + this.TARGET_ROW);
    if (row) {
      row.classList.remove('landed', 'hit');
      const cell = row.querySelector('.l6-ht-cell');
      if (cell) cell.innerText = '';
    }

    const fly = document.getElementById('l6FlyDoc');
    if (fly) {
      fly.classList.remove('visible');
      fly.style.transition = 'none';
      fly.style.left = '';
      fly.style.top = '';
      fly.style.width = '';
      fly.style.height = '';
    }

    const prompt = document.getElementById('l6SearchPrompt');
    if (prompt) {
      prompt.classList.remove('show', 'answered');
      const q = prompt.querySelector('.l6-prompt-q');
      if (q) q.style.display = '';
    }

    const indicator = document.getElementById('l6ScanIndicator');
    const status = document.getElementById('l6ScanStatus');
    if (indicator) indicator.classList.remove('active');
    if (status) status.innerText = 'Waiting for the document';

    const caption = document.getElementById('l6LabCaption');
    if (caption) caption.innerText = 'Press “Store the Document” — the document must land in its calculated position.';

    const phase = document.getElementById('l6StorePhase');
    if (phase) phase.innerText = 'STORING';

    const banner = document.querySelector('#l6-concept-card .l6-concept');
    if (banner) banner.classList.remove('play');

    const canvas = document.querySelector('#level-6 .level-canvas');
    if (canvas) canvas.classList.remove('l6-stage-3');
    const htTitle = document.querySelector('#level-6 .l6-htable-title');
    if (htTitle) htTitle.innerText = 'HASH TABLE (INDEX 0 – 9)';

    const questionCard = document.getElementById('l6-question-card');
    const storeCard = document.getElementById('l6-store-card');
    const conceptCard = document.getElementById('l6-concept-card');
    if (questionCard) questionCard.classList.remove('hidden');
    if (storeCard) storeCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.add('hidden');

    PresentationApp.updateStepTracker(1, 3);
    PresentationApp.updateNotesStep(1);
  },

  // Slide the physical document from the desk into Index 4 of the hash table
  flyToTable() {
    const lab = document.getElementById('l6Lab');
    const src = document.getElementById('l6SrcDoc');
    const row = document.getElementById('l6Row-' + this.TARGET_ROW);
    const fly = document.getElementById('l6FlyDoc');
    if (!lab || !src || !row || !fly) return;

    const cell = row.querySelector('.l6-ht-cell') || row;
    const labRect = lab.getBoundingClientRect();
    const srcRect = src.getBoundingClientRect();
    const tgtRect = cell.getBoundingClientRect();
    if (!labRect.width) return;

    fly.classList.remove('visible');
    fly.style.transition = 'none';
    fly.style.left = (srcRect.left - labRect.left) + 'px';
    fly.style.top = (srcRect.top - labRect.top) + 'px';
    fly.style.width = srcRect.width + 'px';
    fly.style.height = srcRect.height + 'px';
    fly.innerText = this.DOC_LABEL;
    void fly.offsetWidth;
    fly.classList.add('visible');
    fly.style.transition = 'left 1s var(--ease-smooth), top 1s var(--ease-smooth), width 1s var(--ease-smooth), height 1s var(--ease-smooth), opacity 0.3s ease';
    fly.style.left = (tgtRect.left - labRect.left) + 'px';
    fly.style.top = (tgtRect.top - labRect.top) + 'px';
    fly.style.width = tgtRect.width + 'px';
    fly.style.height = tgtRect.height + 'px';
  },

  startStore() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.currentStep = 2;
    PresentationApp.updateStepTracker(2, 3);
    PresentationApp.updateNotesStep(2);

    const questionCard = document.getElementById('l6-question-card');
    const storeCard = document.getElementById('l6-store-card');
    const conceptCard = document.getElementById('l6-concept-card');
    if (questionCard) questionCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.add('hidden');
    if (storeCard) storeCard.classList.remove('hidden');

    const indicator = document.getElementById('l6ScanIndicator');
    const status = document.getElementById('l6ScanStatus');
    if (indicator) indicator.classList.add('active');
    if (status) status.innerText = 'Storing the document...';

    const src = document.getElementById('l6SrcDoc');
    const srcState = document.getElementById('l6SrcState');
    const box = document.getElementById('l6HashBox');
    const display = document.getElementById('l6CalcDisplay');
    const row = document.getElementById('l6Row-' + this.TARGET_ROW);
    const cell = row ? row.querySelector('.l6-ht-cell') : null;
    const fly = document.getElementById('l6FlyDoc');
    const prompt = document.getElementById('l6SearchPrompt');
    const caption = document.getElementById('l6LabCaption');
    const detail = document.getElementById('l6StoreDetail');
    const phase = document.getElementById('l6StorePhase');

    // --- BEAT 1: THE DOCUMENT & ITS KEY ---
    this.later(() => {
      if (src) src.classList.add('active');
      if (srcState) srcState.innerText = 'KEY 1234';
      if (caption) caption.innerText = '📄 The Aadhaar document — identified by its KEY 1234.';
      if (detail) detail.innerText = 'Key 1234 identifies this Aadhaar document...';
      if (phase) phase.innerText = 'KEY';
    }, 300);

    // --- BEAT 2: HASH FUNCTION GIVES POSITION 4 ---
    this.later(() => {
      if (box) box.classList.add('active');
      if (display) display.innerText = '1234 → … → ?';
      if (caption) caption.innerText = '⚙️ Feed the key into the SAME hash function...';
      if (detail) detail.innerText = 'Running the hash function on key 1234...';
      if (phase) phase.innerText = 'CALCULATING';
    }, 1300);

    this.later(() => {
      if (box) {
        box.classList.add('zap');
        this.later(() => box.classList.remove('zap'), 450);
      }
      if (display) display.innerText = '1234 → … → 4';
      if (caption) caption.innerText = '⚙️ Position 4 calculated — but where do we keep the document?';
      if (detail) detail.innerText = 'Location 4 ready — now we need a place to store it';
      if (phase) phase.innerText = 'POSITION 4';
    }, 2100);

    // --- BEAT 3: DOCUMENT SLIDES INTO THE HASH TABLE ---
    this.later(() => {
      if (src) src.classList.add('flying');
      if (srcState) srcState.innerText = 'MOVING...';
      if (caption) caption.innerText = '🗂️ Into the HASH TABLE it goes — Index 4!';
      if (detail) detail.innerText = 'Placing the document into the Hash Table...';
      if (phase) phase.innerText = 'STORING';
      this.flyToTable();
    }, 3100);

    this.later(() => {
      if (fly) fly.classList.remove('visible');
      if (row) row.classList.add('landed');
      if (cell) cell.innerText = this.DOC_LABEL;
      if (src) {
        src.classList.remove('flying', 'active');
        src.classList.add('done');
      }
      if (srcState) srcState.innerText = 'STORED AT 4';
      if (caption) caption.innerText = '✅ Hash Table → Index 4 now holds the Aadhaar document.';
      if (detail) detail.innerText = 'Document stored at Index 4 of the Hash Table!';
      if (phase) phase.innerText = 'STORED ✔';
      if (status) status.innerText = 'Stored at Index 4';
    }, 4300);

    // --- BEAT 4: LATER, THE EVALUATOR ASKS AGAIN ---
    this.later(() => {
      if (prompt) prompt.classList.add('show');
      if (caption) caption.innerText = '📋 Later, the evaluator asks for the SAME Aadhaar document. We only have the key 1234.';
      if (detail) detail.innerText = 'Search request: key 1234 — no scanning needed';
      if (phase) phase.innerText = 'SEARCHING';
      if (status) status.innerText = 'Searching with key 1234';
      if (srcState) srcState.innerText = 'NEEDED AGAIN';
      if (src) {
        src.classList.remove('done');
        src.classList.add('active');
      }
    }, 5600);

    // --- BEAT 5: SAME KEY → SAME FUNCTION → SAME POSITION ---
    this.later(() => {
      if (box) box.classList.add('active');
      if (display) display.innerText = '1234 → … → ?';
      if (caption) caption.innerText = '🔁 Same key, same hash function — run it again...';
      if (detail) detail.innerText = 'Hash function running on key 1234 (again)...';
    }, 6800);

    this.later(() => {
      if (box) {
        box.classList.add('zap');
        this.later(() => box.classList.remove('zap'), 450);
      }
      if (display) display.innerText = '1234 → … → 4';
      if (row) row.classList.add('hit');
      if (caption) caption.innerText = '⚙️ Position 4 again — jump straight there!';
      if (phase) phase.innerText = 'POSITION 4';
    }, 7600);

    // --- BEAT 6: DIRECT HIT ---
    this.later(() => {
      if (prompt) prompt.classList.add('answered');
      if (caption) caption.innerText = '🎯 Index 4 → Aadhaar document. Zero documents checked!';
      if (detail) detail.innerText = 'Found directly at Index 4 — 0 documents scanned!';
      if (phase) phase.innerText = '1 JUMP ✔';
      if (status) status.innerText = 'Direct hit at Index 4';
      if (srcState) srcState.innerText = 'FOUND AT 4';
      if (src) src.classList.remove('active');
      this.isRunning = false;
      this.later(() => this.showConcept(), 2400);
    }, 8600);
  },

  showConcept() {
    this.clearTimers();
    this.isRunning = false;
    this.currentStep = 3;
    PresentationApp.updateStepTracker(3, 3);
    PresentationApp.updateNotesStep(3);

    const storeCard = document.getElementById('l6-store-card');
    const conceptCard = document.getElementById('l6-concept-card');
    if (storeCard) storeCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.remove('hidden');

    const indicator = document.getElementById('l6ScanIndicator');
    const status = document.getElementById('l6ScanStatus');
    if (indicator) indicator.classList.remove('active');
    if (status) status.innerText = 'Stored & found at Index 4';

    const box = document.getElementById('l6HashBox');
    if (box) box.classList.remove('active', 'zap');
    const row = document.getElementById('l6Row-' + this.TARGET_ROW);
    if (row) row.classList.remove('hit');

    // Collapse the table to the target neighbourhood so the definition card fits on screen
    const canvas = document.querySelector('#level-6 .level-canvas');
    if (canvas) canvas.classList.add('l6-stage-3');
    const htTitle = document.querySelector('#level-6 .l6-htable-title');
    if (htTitle) htTitle.innerText = 'HASH TABLE — ZOOM ON INDEX 4';

    // Replay the KEY → HASH FUNCTION → HASH TABLE reveal, one by one
    const banner = document.querySelector('#l6-concept-card .l6-concept');
    if (banner) {
      banner.classList.remove('play');
      void banner.offsetWidth;
      banner.classList.add('play');
    }
  },

  handleNext() {
    if (this.currentStep === 1) {
      this.startStore();
    } else if (this.currentStep === 2) {
      this.showConcept();
    } else if (this.currentStep === 3) {
      PresentationApp.nextStage();
    }
  },

  handlePrev() {
    if (this.currentStep > 1) {
      this.reset();
    }
  }
};

// ============================================================================
// LEVEL 7 CONTROLLER (Collision — Key 5678 → Location 4, Occupied)
// ============================================================================
const Level7Controller = {
  currentStep: 1,
  totalSteps: 3,
  isCalculating: false,
  timers: [],
  TARGET_SLOT: 4,

  init() {
    this.reset();
  },

  clearTimers() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
  },

  later(fn, ms) {
    const t = setTimeout(fn, ms);
    this.timers.push(t);
    return t;
  },

  reset() {
    this.clearTimers();
    this.isCalculating = false;
    this.currentStep = 1;

    const keycard = document.getElementById('l7KeyCard');
    if (keycard) keycard.className = 'l5-keycard';

    const box = document.getElementById('l7HashBox');
    if (box) box.classList.remove('active', 'zap');

    const slot = document.getElementById('l7Slot-' + this.TARGET_SLOT);
    if (slot) {
      slot.classList.add('filled', 'occupied');
      slot.classList.remove('conflict');
      const fill = slot.querySelector('.l3-slot-fill');
      if (fill) fill.innerText = '🪪';
    }

    const display = document.getElementById('l7CalcDisplay');
    if (display) display.innerText = '5678 → ? → ?';

    const indicator = document.getElementById('l7ScanIndicator');
    const status = document.getElementById('l7ScanStatus');
    if (indicator) indicator.classList.remove('active');
    if (status) status.innerText = 'Slot 4 occupied';

    const caption = document.getElementById('l7LabCaption');
    if (caption) caption.innerText = 'Position 4 already holds document 1234. Run the calculation for 5678…';

    const phase = document.getElementById('l7CalcPhase');
    if (phase) phase.innerText = 'CALCULATING';

    const questionCard = document.getElementById('l7-question-card');
    const calcCard = document.getElementById('l7-calc-card');
    const conceptCard = document.getElementById('l7-concept-card');
    if (questionCard) questionCard.classList.remove('hidden');
    if (calcCard) calcCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.add('hidden');

    PresentationApp.updateStepTracker(1, 3);
    PresentationApp.updateNotesStep(1);
  },

  startCalc() {
    if (this.isCalculating) return;
    this.isCalculating = true;
    this.currentStep = 2;
    PresentationApp.updateStepTracker(2, 3);
    PresentationApp.updateNotesStep(2);

    const questionCard = document.getElementById('l7-question-card');
    const calcCard = document.getElementById('l7-calc-card');
    const conceptCard = document.getElementById('l7-concept-card');
    if (questionCard) questionCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.add('hidden');
    if (calcCard) calcCard.classList.remove('hidden');

    const indicator = document.getElementById('l7ScanIndicator');
    const status = document.getElementById('l7ScanStatus');
    if (indicator) indicator.classList.add('active');
    if (status) status.innerText = 'Calculating...';

    const keycard = document.getElementById('l7KeyCard');
    const box = document.getElementById('l7HashBox');
    const display = document.getElementById('l7CalcDisplay');
    const slot = document.getElementById('l7Slot-' + this.TARGET_SLOT);
    const caption = document.getElementById('l7LabCaption');
    const detail = document.getElementById('l7CalcDetail');
    const phase = document.getElementById('l7CalcPhase');

    // --- BEAT 1: CALCULATE ---
    this.later(() => {
      if (keycard) keycard.classList.add('active');
      if (box) box.classList.add('active');
      if (display) display.innerText = '5678 → … → ?';
      if (caption) caption.innerText = '🔑 New key 5678 enters the hash function...';
      if (detail) detail.innerText = 'Performing calculation on key 5678...';
      if (phase) phase.innerText = 'CALCULATING';
    }, 300);

    this.later(() => {
      if (box) {
        box.classList.add('zap');
        this.later(() => box.classList.remove('zap'), 450);
      }
      if (display) display.innerText = '5678 → … → 4';
      if (caption) caption.innerText = '⚙️ Calculation says: LOCATION 4 — again!';
      if (detail) detail.innerText = 'Result: Location 4… but it is already occupied!';
    }, 1400);

    // --- BEAT 2: COLLISION ---
    this.later(() => {
      if (slot) slot.classList.add('conflict');
      if (keycard) {
        keycard.classList.remove('active');
        keycard.classList.add('blocked');
      }
      if (caption) caption.innerText = '💥 COLLISION! Position 4 is already occupied (by key 1234).';
      if (detail) detail.innerText = 'Two different keys, one location — COLLISION!';
      if (phase) phase.innerText = 'COLLISION!';
      if (status) status.innerText = 'Collision at slot 4!';
    }, 2500);

    this.later(() => {
      if (caption) caption.innerText = '1234 → Position 4 &nbsp;|&nbsp; 5678 → Position 4 — keys differ, spot same!';
      this.isCalculating = false;
      this.later(() => this.showConcept(), 2200);
    }, 4300);
  },

  showConcept() {
    this.clearTimers();
    this.isCalculating = false;
    this.currentStep = 3;
    PresentationApp.updateStepTracker(3, 3);
    PresentationApp.updateNotesStep(3);

    const calcCard = document.getElementById('l7-calc-card');
    const conceptCard = document.getElementById('l7-concept-card');
    if (calcCard) calcCard.classList.add('hidden');
    if (conceptCard) conceptCard.classList.remove('hidden');

    const indicator = document.getElementById('l7ScanIndicator');
    const status = document.getElementById('l7ScanStatus');
    if (indicator) indicator.classList.remove('active');
    if (status) status.innerText = 'Collision found!';

    const box = document.getElementById('l7HashBox');
    if (box) box.classList.remove('active', 'zap');
    const slot = document.getElementById('l7Slot-' + this.TARGET_SLOT);
    if (slot) slot.classList.remove('conflict');
    const keycard = document.getElementById('l7KeyCard');
    if (keycard) {
      keycard.classList.remove('active');
      keycard.classList.add('blocked');
    }
  },

  handleNext() {
    if (this.currentStep === 1) {
      this.startCalc();
    } else if (this.currentStep === 2) {
      this.showConcept();
    } else if (this.currentStep === 3) {
      PresentationApp.nextStage();
    }
  },

  handlePrev() {
    if (this.currentStep > 1) {
      this.reset();
    }
  }
};

// ============================================================================
// LEVEL 8 CONTROLLER (Applications — Passwords · Database Search · Deduplication)
// ============================================================================
const Level8Controller = {
  currentStep: 1,
  totalSteps: 5,
  isRunning: false,
  timers: [],
  PANELS: ['l8PanelApps', 'l8PanelPw', 'l8PanelDb', 'l8PanelDedup', 'l8PanelFinal'],
  TILES: ['l8Tile1', 'l8Tile2', 'l8Tile3'],
  DB_ROWS: ['101', '102', '103', '104', '105'],

  init() {
    this.reset();
  },

  clearTimers() {
    this.timers.forEach(t => clearTimeout(t));
    this.timers = [];
  },

  later(fn, ms) {
    const t = setTimeout(fn, ms);
    this.timers.push(t);
    return t;
  },

  el(id) {
    return document.getElementById(id);
  },

  add(id, ...cls) {
    const node = this.el(id);
    if (node) node.classList.add(...cls);
  },

  remove(id, ...cls) {
    const node = this.el(id);
    if (node) node.classList.remove(...cls);
  },

  showPanel(panelId) {
    this.PANELS.forEach(p => {
      const node = this.el(p);
      if (node) node.classList.toggle('hidden', p !== panelId);
    });
  },

  setDesk(heading, status, live) {
    const h = this.el('l8DeskHeading');
    if (h) h.innerText = heading;
    const s = this.el('l8ScanStatus');
    if (s) s.innerText = status;
    const ind = this.el('l8ScanIndicator');
    if (ind) ind.classList.toggle('active', !!live);
  },

  setCaption(text) {
    const c = this.el('l8LabCaption');
    if (c) c.innerText = text;
  },

  setLive(detail, phase) {
    const d = this.el('l8LiveDetail');
    if (d) d.innerText = detail;
    const p = this.el('l8LivePhase');
    if (p) p.innerText = phase;
  },

  showBottom(state) {
    const questionCard = this.el('l8-question-card');
    const liveCard = this.el('l8-live-card');
    const finalCard = this.el('l8-final-card');
    if (questionCard) questionCard.classList.toggle('hidden', state !== 'question');
    if (liveCard) liveCard.classList.toggle('hidden', state !== 'live');
    if (finalCard) finalCard.classList.toggle('hidden', state !== 'final');
  },

  // Flying token: value / file travels from one element to another
  fly(fromNode, toNode, text) {
    const stage = this.el('l8Stage');
    const token = this.el('l8FlyToken');
    if (!stage || !token || !fromNode || !toNode) return;
    const s = stage.getBoundingClientRect();
    const f = fromNode.getBoundingClientRect();
    const t = toNode.getBoundingClientRect();
    if (!f.width || !t.width) return;
    token.innerText = text;
    token.classList.remove('visible');
    token.style.transition = 'none';
    token.style.left = (f.left + f.width / 2 - s.left) + 'px';
    token.style.top = (f.top + f.height / 2 - s.top) + 'px';
    token.style.transform = 'translate(-50%, -50%) scale(0.7)';
    void token.offsetWidth;
    token.style.transition = '';
    token.classList.add('visible');
    token.style.transform = 'translate(-50%, -50%) scale(1)';
    token.style.left = (t.left + t.width / 2 - s.left) + 'px';
    token.style.top = (t.top + t.height / 2 - s.top) + 'px';
    this.later(() => this.hideToken(), 950);
  },

  hideToken() {
    this.remove('l8FlyToken', 'visible');
  },

  resetPasswordScene() {
    ['l8PwCard', 'l8PwHashVal', 'l8PwStored', 'l8PwEntered', 'l8PwCompare'].forEach(id => {
      this.remove(id, 'in', 'active');
    });
    ['l8PwHashBox', 'l8PwHashBox2'].forEach(id => this.remove(id, 'active', 'zap'));
    this.remove('l8PwVerdict', 'in');
    this.remove('l8PwIdea', 'in');
    const calc = this.el('l8PwCalc');
    if (calc) calc.innerText = 'MyPassword123 → ?';
  },

  resetDatabaseScene() {
    this.remove('l8DbSearch', 'in', 'active');
    this.remove('l8DbHashBox', 'active', 'zap');
    this.remove('l8DbChain', 'in');
    this.remove('l8DbIdea', 'in');
    const calc = this.el('l8DbCalc');
    if (calc) calc.innerText = '103 → ?';
    this.DB_ROWS.forEach(id => this.remove('l8DbRow-' + id, 'in', 'dim', 'found'));
  },

  resetDedupScene() {
    ['l8FileA', 'l8FileB', 'l8ChipA', 'l8ChipB'].forEach(id => this.remove(id, 'in', 'active'));
    ['l8HashA', 'l8HashB'].forEach(id => this.remove(id, 'active', 'zap'));
    this.remove('l8Match', 'in');
    this.remove('l8DedupIdea', 'in');
  },

  resetFinalScene() {
    ['l8TreeRoot', 'l8TreeLinks', 'l8Leaf1', 'l8Leaf2', 'l8Leaf3'].forEach(id => this.remove(id, 'in'));
    const banner = document.querySelector('#l8-final-card .l8-final');
    if (banner) banner.classList.remove('play');
  },

  reset() {
    this.clearTimers();
    this.isRunning = false;
    this.currentStep = 1;
    this.hideToken();

    this.showPanel('l8PanelApps');
    this.TILES.forEach(id => this.remove(id, 'in'));

    this.resetPasswordScene();
    this.resetDatabaseScene();
    this.resetDedupScene();
    this.resetFinalScene();
    this.showBottom('question');

    this.setDesk('Three everyday places where hashing quietly works…', '3 applications', false);
    this.setCaption('Three applications of hashing — revealed one by one.');

    PresentationApp.updateStepTracker(1, this.totalSteps);
    PresentationApp.updateNotesStep(1);

    // The three applications appear one by one
    this.TILES.forEach((id, i) => {
      this.later(() => this.add(id, 'in'), 300 + i * 480);
    });
  },

  // -------------------------------------------------------------------------
  // STEP 2: PASSWORD STORAGE
  // -------------------------------------------------------------------------
  startPassword() {
    this.clearTimers();
    this.isRunning = true;
    this.currentStep = 2;
    this.hideToken();
    PresentationApp.updateStepTracker(2, this.totalSteps);
    PresentationApp.updateNotesStep(2);

    this.showPanel('l8PanelPw');
    this.showBottom('live');
    this.resetPasswordScene();

    this.setDesk('Password Storage 🔐 — only the hash is kept', 'Hashing password…', true);
    this.setCaption('🔐 Real password → hash function → stored hash.');
    this.setLive('Storing the password as a hash…', 'STORE');

    const card = this.el('l8PwCard');
    const box = this.el('l8PwHashBox');
    const hashVal = this.el('l8PwHashVal');
    const stored = this.el('l8PwStored');
    const entered = this.el('l8PwEntered');
    const box2 = this.el('l8PwHashBox2');
    const compare = this.el('l8PwCompare');

    this.later(() => {
      this.add('l8PwCard', 'in', 'active');
      this.setCaption('🔑 User password: MyPassword123 — we do NOT store this.');
    }, 300);

    this.later(() => {
      this.add('l8PwHashBox', 'active');
      this.fly(card, box, 'MyPassword123');
      this.setLive('Feeding the password into the hash function…', 'HASHING');
    }, 1000);

    this.later(() => {
      this.add('l8PwHashBox', 'zap');
      this.later(() => this.remove('l8PwHashBox', 'zap'), 450);
      const calc = this.el('l8PwCalc');
      if (calc) calc.innerText = 'MyPassword123 → 8f3a…';
      this.setCaption('⚙️ Out comes a short hash: 8f3a…');
    }, 2000);

    this.later(() => {
      this.add('l8PwHashVal', 'in');
      this.fly(box, hashVal, '8f3a…');
    }, 2200);

    this.later(() => {
      this.remove('l8PwCard', 'active');
      this.add('l8PwStored', 'in');
      this.setCaption('💾 Only the hash is stored — the real password never is.');
      this.setLive('Stored: 8f3a… (not the password)', 'STORED ✔');
      this.setDesk('Password Storage 🔐 — hash saved', 'Hash saved', true);
    }, 3300);

    this.later(() => {
      this.add('l8PwEntered', 'in');
      this.setCaption('🔓 Later the user logs in and types the password again…');
      this.setLive('Login attempt: hashing the entered password…', 'LOGIN');
    }, 4300);

    this.later(() => {
      this.add('l8PwHashBox2', 'active', 'zap');
      this.later(() => this.remove('l8PwHashBox2', 'zap'), 450);
    }, 4900);

    this.later(() => {
      this.add('l8PwCompare', 'in');
      this.setCaption('🔍 Same hash function → compare with the stored hash.');
      this.setLive('Comparing 8f3a… with the stored hash…', 'COMPARE');
    }, 5300);

    this.later(() => {
      this.add('l8PwVerdict', 'in');
      this.setCaption('✔ Hashes match — access granted!');
      this.setLive('Hashes match — access granted', 'MATCH ✔');
      this.setDesk('Password Storage 🔐 — access granted', 'Access granted', false);
    }, 5900);

    this.later(() => {
      this.add('l8PwIdea', 'in');
      this.isRunning = false;
    }, 6700);
  },

  // -------------------------------------------------------------------------
  // STEP 3: DATABASE SEARCHING
  // -------------------------------------------------------------------------
  startDatabase() {
    this.clearTimers();
    this.isRunning = true;
    this.currentStep = 3;
    this.hideToken();
    PresentationApp.updateStepTracker(3, this.totalSteps);
    PresentationApp.updateNotesStep(3);

    this.showPanel('l8PanelDb');
    this.showBottom('live');
    this.resetDatabaseScene();

    this.setDesk('Database Search 🗄️ — reach the record directly', 'Searching for 103', true);
    this.setCaption('🔎 Student ID = 103 — where is that record?');
    this.setLive('Searching for Student ID 103…', 'SEARCH');

    const search = this.el('l8DbSearch');
    const box = this.el('l8DbHashBox');
    const row = this.el('l8DbRow-103');

    this.later(() => {
      this.add('l8DbSearch', 'in', 'active');
      this.setCaption('🔎 Search request: Student ID 103.');
    }, 300);

    this.later(() => {
      this.add('l8DbHashBox', 'active');
      this.fly(search, box, '103');
      this.setLive('Key 103 into the hash function…', 'HASHING');
    }, 1000);

    this.later(() => {
      this.DB_ROWS.forEach((id, i) => {
        this.later(() => this.add('l8DbRow-' + id, 'in'), i * 130);
      });
      this.setCaption('📋 The database holds many student records…');
    }, 2000);

    this.later(() => {
      this.add('l8DbHashBox', 'zap');
      this.later(() => this.remove('l8DbHashBox', 'zap'), 450);
      const calc = this.el('l8DbCalc');
      if (calc) calc.innerText = '103 → ROW 3';
      this.setCaption('⚙️ Hash function gives the table position — ROW 3.');
      this.setLive('Table position found: ROW 3', 'POSITION');
    }, 3100);

    this.later(() => {
      this.fly(box, row, '103');
    }, 3600);

    this.later(() => {
      this.DB_ROWS.forEach(id => {
        if (id !== '103') this.add('l8DbRow-' + id, 'dim');
      });
      this.add('l8DbRow-103', 'found');
      this.remove('l8DbSearch', 'active');
      this.setCaption('🎯 Direct jump to Student 103 — zero records checked!');
      this.setLive('Found Student 103 — 0 records scanned', 'DIRECT HIT ✔');
      this.setDesk('Database Search 🗄️ — record found', 'Record found', false);
    }, 4500);

    this.later(() => {
      this.add('l8DbChain', 'in');
      this.setCaption('Key → Hash Function → Location → Data — the same pipeline!');
    }, 5300);

    this.later(() => {
      this.add('l8DbIdea', 'in');
      this.isRunning = false;
    }, 6100);
  },

  // -------------------------------------------------------------------------
  // STEP 4: FILE / DATA DEDUPLICATION
  // -------------------------------------------------------------------------
  startDedup() {
    this.clearTimers();
    this.isRunning = true;
    this.currentStep = 4;
    this.hideToken();
    PresentationApp.updateStepTracker(4, this.totalSteps);
    PresentationApp.updateNotesStep(4);

    this.showPanel('l8PanelDedup');
    this.showBottom('live');
    this.resetDedupScene();

    this.setDesk('File Deduplication 📁 — same content, stored once', 'Hashing files…', true);
    this.setCaption('📄 Two files arrive: notes.pdf and copy.pdf.');
    this.setLive('Two files to check…', 'FILES');

    const fileA = this.el('l8FileA');
    const fileB = this.el('l8FileB');
    const hashA = this.el('l8HashA');
    const hashB = this.el('l8HashB');

    this.later(() => {
      this.add('l8FileA', 'in', 'active');
      this.add('l8FileB', 'in');
      this.setCaption('📄 File A and File B — do they hold the same content?');
    }, 300);

    this.later(() => {
      this.add('l8HashA', 'active', 'zap');
      this.later(() => this.remove('l8HashA', 'zap'), 450);
      this.fly(fileA, hashA, 'File A');
      this.setLive('Hashing File A…', 'HASH A');
    }, 1300);

    this.later(() => {
      this.add('l8ChipA', 'in');
      this.fly(hashA, this.el('l8ChipA'), 'ABC123');
      this.setCaption('⚙️ File A → hash → ABC123');
    }, 2100);

    this.later(() => {
      this.remove('l8FileA', 'active');
      this.add('l8FileB', 'active');
      this.add('l8HashB', 'active', 'zap');
      this.later(() => this.remove('l8HashB', 'zap'), 450);
      this.fly(fileB, hashB, 'File B');
      this.setLive('Hashing File B…', 'HASH B');
    }, 2800);

    this.later(() => {
      this.add('l8ChipB', 'in');
      this.fly(hashB, this.el('l8ChipB'), 'ABC123');
      this.setCaption('⚙️ File B → hash → ABC123 — the same value!');
    }, 3600);

    this.later(() => {
      this.add('l8Match', 'in');
      this.remove('l8FileB', 'active');
      this.setCaption('🔗 Same hash → possible same content → store one copy!');
      this.setLive('Both hashes match: ABC123', 'SAME HASH ✔');
      this.setDesk('File Deduplication 📁 — duplicate found', 'Duplicate found', false);
    }, 4400);

    this.later(() => {
      this.add('l8DedupIdea', 'in');
      this.setCaption('🗜️ Two files, one stored copy — no wasted space.');
      this.isRunning = false;
    }, 5200);
  },

  // -------------------------------------------------------------------------
  // STEP 5: THE FINAL PICTURE
  // -------------------------------------------------------------------------
  showFinal() {
    this.clearTimers();
    this.isRunning = true;
    this.currentStep = 5;
    this.hideToken();
    PresentationApp.updateStepTracker(5, this.totalSteps);
    PresentationApp.updateNotesStep(5);

    this.showPanel('l8PanelFinal');
    this.showBottom('final');
    this.resetFinalScene();

    this.setDesk('One idea, many uses — the big picture', '3 applications', false);
    this.setCaption('Passwords · Databases · Files — one core idea behind all three.');

    this.later(() => this.add('l8TreeRoot', 'in'), 300);
    this.later(() => this.add('l8TreeLinks', 'in'), 850);
    this.later(() => this.add('l8Leaf1', 'in'), 1300);
    this.later(() => this.add('l8Leaf2', 'in'), 1750);
    this.later(() => this.add('l8Leaf3', 'in'), 2200);

    this.later(() => {
      const banner = document.querySelector('#l8-final-card .l8-final');
      if (banner) banner.classList.add('play');
      this.isRunning = false;
    }, 2700);
  },

  handleNext() {
    if (this.currentStep === 1) {
      this.startPassword();
    } else if (this.currentStep === 2) {
      this.startDatabase();
    } else if (this.currentStep === 3) {
      this.startDedup();
    } else if (this.currentStep === 4) {
      this.showFinal();
    } else {
      PresentationApp.nextStage();
    }
  },

  handlePrev() {
    if (this.currentStep <= 1) return;
    const back = this.currentStep - 1;
    if (back === 1) this.reset();
    else if (back === 2) this.startPassword();
    else if (back === 3) this.startDatabase();
    else if (back === 4) this.startDedup();
  }
};

// ============================================================================
// MAIN PRESENTATION APPLICATION ORCHESTRATOR
// ============================================================================
const PresentationApp = {
  currentLevel: 1,
  totalLevels: 8,
  maxUnlockedLevel: 8,
  isFullscreen: false,
  isNotesOpen: false,

  levelTitles: [
    'A Real-Life Example',
    'The Big Problem: 1 Lakh Documents',
    'What is Hashing?',
    'What is a Key?',
    'The Hash Function',
    'The Hash Table',
    'Collision & How to Fix It',
    'Applications of Hashing'
  ],

  init() {
    this.setupEventListeners();
    this.updateHUD();
    Level1Controller.init();
    Level2Controller.init();
    Level3Controller.init();
    Level4Controller.init();
    Level5Controller.init();
    Level6Controller.init();
    Level7Controller.init();
    Level8Controller.init();
  },

  setupEventListeners() {
    // Keyboard controller
    window.addEventListener('keydown', (e) => {
      // Ignore key events when typing inside any inputs
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      switch (e.key) {
        case ' ':
        case 'ArrowRight':
        case 'Enter':
          e.preventDefault();
          this.next();
          break;

        case 'ArrowLeft':
        case 'Backspace':
          e.preventDefault();
          this.prev();
          break;

        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;

        case 'n':
        case 'N':
          e.preventDefault();
          this.toggleNotes();
          break;

        case 'r':
        case 'R':
          e.preventDefault();
          this.replayCurrentLevel();
          break;

        case '?':
          e.preventDefault();
          this.toggleHelpModal();
          break;

        case 'Escape':
          this.closeModals();
          break;

        // Level quick keys (locked levels show a toast)
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
          this.goToLevel(parseInt(e.key));
          break;
      }
    });

    // Quick level switcher dots
    document.querySelectorAll('.switcher-dot').forEach(dot => {
      dot.addEventListener('click', () => this.goToLevel(parseInt(dot.dataset.jump, 10)));
    });

    // UI Buttons (Notes & Shortcuts are keyboard-only: N / ?)
    document.getElementById('fullscreenToggleBtn').addEventListener('click', () => this.toggleFullscreen());
    document.getElementById('closeNotesBtn').addEventListener('click', () => this.toggleNotes(false));

    // Fullscreen change sync
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !!document.fullscreenElement;
      document.body.classList.toggle('is-fullscreen', this.isFullscreen);
    });
  },

  next() {
    if (this.currentLevel === 1) {
      Level1Controller.handleNext();
    } else if (this.currentLevel === 2) {
      Level2Controller.handleNext();
    } else if (this.currentLevel === 3) {
      Level3Controller.handleNext();
    } else if (this.currentLevel === 4) {
      Level4Controller.handleNext();
    } else if (this.currentLevel === 5) {
      Level5Controller.handleNext();
    } else if (this.currentLevel === 6) {
      Level6Controller.handleNext();
    } else if (this.currentLevel === 7) {
      Level7Controller.handleNext();
    } else if (this.currentLevel === 8) {
      Level8Controller.handleNext();
    } else {
      this.nextStage();
    }
  },

  prev() {
    if (this.currentLevel === 1) {
      Level1Controller.handlePrev();
    } else if (this.currentLevel === 2) {
      Level2Controller.handlePrev();
    } else if (this.currentLevel === 3) {
      Level3Controller.handlePrev();
    } else if (this.currentLevel === 4) {
      Level4Controller.handlePrev();
    } else if (this.currentLevel === 5) {
      Level5Controller.handlePrev();
    } else if (this.currentLevel === 6) {
      Level6Controller.handlePrev();
    } else if (this.currentLevel === 7) {
      Level7Controller.handlePrev();
    } else if (this.currentLevel === 8) {
      Level8Controller.handlePrev();
    } else {
      this.prevStage();
    }
  },

  nextStage() {
    if (this.currentLevel < this.totalLevels) {
      this.maxUnlockedLevel = Math.max(this.maxUnlockedLevel, this.currentLevel + 1);
      this.showToast(`<strong>LEVEL 0${this.currentLevel} COMPLETE ✔</strong><br>Opening Level 0${this.currentLevel + 1}...`);
      this.goToLevel(this.currentLevel + 1);
    } else {
      this.showToast('<strong>PRESENTATION COMPLETE 🎓</strong><br>All 8 levels delivered.');
    }
  },

  prevStage() {
    if (this.currentLevel > 1) {
      this.goToLevel(this.currentLevel - 1);
    }
  },

  goToLevel(levelNum) {
    if (levelNum < 1 || levelNum > this.totalLevels) return;
    if (levelNum > this.maxUnlockedLevel) {
      this.notifyLevelLocked(levelNum);
      return;
    }

    this.currentLevel = levelNum;

    document.querySelectorAll('.stage-level').forEach(sec => {
      sec.classList.toggle('active', parseInt(sec.dataset.level, 10) === levelNum);
    });

    document.querySelectorAll('.switcher-dot').forEach(dot => {
      const dotLevel = parseInt(dot.dataset.jump, 10);
      dot.classList.toggle('active', dotLevel === levelNum);
      dot.disabled = dotLevel > this.maxUnlockedLevel;
    });

    this.updateHUD();
    this.resetActiveLevel();
  },

  resetActiveLevel() {
    if (this.currentLevel === 1) {
      Level1Controller.reset();
    } else if (this.currentLevel === 2) {
      Level2Controller.reset();
    } else if (this.currentLevel === 3) {
      Level3Controller.reset();
    } else if (this.currentLevel === 4) {
      Level4Controller.reset();
    } else if (this.currentLevel === 5) {
      Level5Controller.reset();
    } else if (this.currentLevel === 6) {
      Level6Controller.reset();
    } else if (this.currentLevel === 7) {
      Level7Controller.reset();
    } else if (this.currentLevel === 8) {
      Level8Controller.reset();
    }
  },

  notifyLevelLocked(levelNum) {
    this.showToast(`<strong>LEVEL 0${levelNum} LOCKED 🔒</strong><br>Waiting for your go-ahead after reviewing Level 0${this.currentLevel}.`);
  },

  showToast(html, duration = 3400) {
    const el = document.getElementById('toastNotice');
    if (!el) return;
    el.innerHTML = html;
    el.classList.add('visible');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove('visible'), duration);
  },

  replayCurrentLevel() {
    this.resetActiveLevel();
  },

  updateHUD() {
    // Current level indicator
    const lvlDisplay = document.getElementById('currentLevelDisplay');
    if (lvlDisplay) lvlDisplay.innerText = String(this.currentLevel).padStart(2, '0');

    const titleDisplay = document.getElementById('levelTitleDisplay');
    if (titleDisplay) titleDisplay.innerText = this.levelTitles[this.currentLevel - 1];

    const notesTag = document.getElementById('notesLevelTag');
    if (notesTag) notesTag.innerText = `LEVEL 0${this.currentLevel}`;
  },

  updateStepTracker(step, totalSteps) {
    const track = document.getElementById('stepTrack');
    const label = document.getElementById('stepCounterLabel');

    if (track) {
      track.innerHTML = '';
      for (let i = 1; i <= totalSteps; i++) {
        const dot = document.createElement('div');
        dot.className = 'step-dot';
        if (i === step) dot.classList.add('active');
        else if (i < step) dot.classList.add('passed');
        track.appendChild(dot);
      }
    }

    if (label) {
      label.innerText = `Step ${step} of ${totalSteps}`;
    }
  },

  updateNotesStep(step) {
    const chunks = document.querySelectorAll('#notesContent .note-chunk');
    chunks.forEach(chunk => {
      const chunkLevel = parseInt(chunk.getAttribute('data-note-level') || '1', 10);
      const chunkStep = parseInt(chunk.getAttribute('data-note-step'), 10);
      chunk.classList.toggle('active', chunkLevel === this.currentLevel && chunkStep === step);
    });
  },

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn('Fullscreen request failed:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  },

  toggleNotes(forceState) {
    const drawer = document.getElementById('presenterNotesDrawer');
    this.isNotesOpen = forceState !== undefined ? forceState : !this.isNotesOpen;
    drawer.classList.toggle('open', this.isNotesOpen);
  },

  toggleHelpModal(show) {
    const modal = document.getElementById('shortcutsModal');
    if (show !== undefined) {
      modal.classList.toggle('open', show);
    } else {
      modal.classList.toggle('open');
    }
  },

  closeModals() {
    this.toggleHelpModal(false);
    this.toggleNotes(false);
  }
};

// Auto-initialize when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  PresentationApp.init();
});
