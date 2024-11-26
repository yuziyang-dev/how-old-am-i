function calculateAge() {
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;

    if (!year || !month || !day) {
        alert('Please enter a complete birth date');
        return;
    }

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    // Calculate days until next birthday
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

    // Display results
    document.getElementById('age-display').textContent = age + ' years old';
    document.getElementById('birthday-countdown').textContent = daysUntilBirthday;
    
    // Calculate zodiac sign and energy advice
    const birthMonth = birthDate.getMonth() + 1;
    const birthDay = birthDate.getDate();
    const zodiacSign = getZodiacSign(birthMonth, birthDay);
    document.getElementById('zodiac-display').innerHTML = `${zodiacSign.symbol} ${zodiacSign.name}`;
    document.getElementById('zodiac-energy').textContent = zodiacSign.energy;
    
    // Handle sleep recommendations
    const sleepRecommendation = getSleepRecommendations(age);
    document.getElementById('sleep-recommendation').innerHTML = `
        <div class="sleep-content">
            <p class="sleep-hours">${sleepRecommendation.hours}</p>
        </div>
    `;
    document.getElementById('energy-advice').textContent = getEnergyAdvice(age);

    // Update sleep facts
    updateSleepFacts(age);
    
    document.getElementById('result').classList.remove('hidden');
}

function updateSleepFacts(age) {
    const facts = document.querySelector('.facts-grid');
    const sleepTime = Math.round(age * 365 * 8 / (24 * 365 * 3)); // Assume 8 hours of sleep per day
    
    facts.innerHTML = `
        <div class="fact-item">
            <div class="fact-icon">🌙</div>
            <div class="fact-content">
                <h3>${sleepTime}</h3>
                <p>years of your ${age} years were spent sleeping</p>
            </div>
        </div>
        <div class="fact-item">
            <div class="fact-icon">⚡️</div>
            <div class="fact-content">
                <h3>${Math.round(age * 365)}</h3>
                <p>nights of sleep in your life</p>
            </div>
        </div>
        <div class="fact-item">
            <div class="fact-icon">⏰</div>
            <div class="fact-content">
                <h3>${Math.round(age * 365 * 8)}</h3>
                <p>hours spent sleeping so far</p>
            </div>
        </div>
    `;
}

function getSleepRecommendations(age) {
    if (age <= 1) {
        return {
            hours: "12-16 hours per day"
        };
    } else if (age <= 5) {
        return {
            hours: "10-13 hours per day"
        };
    } else if (age <= 12) {
        return {
            hours: "9-12 hours per day"
        };
    } else if (age <= 18) {
        return {
            hours: "8-10 hours per day"
        };
    } else if (age <= 64) {
        return {
            hours: "7-9 hours per day"
        };
    } else {
        return {
            hours: "7-8 hours per day"
        };
    }
}

function getZodiacSign(month, day) {
    const zodiacSigns = [
        { name: "Capricorn", symbol: "♑", emoji: "🐐", start: [12, 22], end: [1, 19], energy: "As an Earth sign, you possess strong willpower and endurance. Regular sleep helps maintain your stable energy field, which is crucial for achieving your goals." },
        { name: "Aquarius", symbol: "♒", emoji: "🏺", start: [1, 20], end: [2, 18], energy: "As an Air sign, your energy field is full of innovation and uniqueness. Adequate sleep helps maintain mental clarity and sparks creative inspiration." },
        { name: "Pisces", symbol: "♓", emoji: "🐟", start: [2, 19], end: [3, 20], energy: "As a Water sign, you're highly empathetic and imaginative. Quality sleep enhances your intuitive abilities and helps you better connect with your inner energy." },
        { name: "Aries", symbol: "♈", emoji: "🐏", start: [3, 21], end: [4, 19], energy: "As a Fire sign, you're full of vitality and passion. Good sleep habits help you better channel and balance this powerful energy." },
        { name: "Taurus", symbol: "♉", emoji: "🐂", start: [4, 20], end: [5, 20], energy: "As an Earth sign, you value stability and comfort. A regular sleep rhythm helps build a solid energy foundation and enhances your quality of life." },
        { name: "Gemini", symbol: "♊", emoji: "👥", start: [5, 21], end: [6, 20], energy: "As an Air sign, your mind is quick and versatile. Sufficient sleep helps integrate various ideas and maintain a clear, active energy field." },
        { name: "Cancer", symbol: "♋", emoji: "🦀", start: [6, 21], end: [7, 22], energy: "As a Water sign, you're emotionally rich and influenced by the moon. Good sleep helps regulate emotional energy and maintain inner balance." },
        { name: "Leo", symbol: "♌", emoji: "🦁", start: [7, 23], end: [8, 22], energy: "As a Fire sign, you radiate brilliance. Quality sleep helps maintain your powerful personal energy field and continue spreading your charm." },
        { name: "Virgo", symbol: "♍", emoji: "👧", start: [8, 23], end: [9, 22], energy: "As an Earth sign, you pursue perfection and detail. Regular sleep helps maintain clear analytical abilities and enhance work efficiency." },
        { name: "Libra", symbol: "♎", emoji: "⚖️", start: [9, 23], end: [10, 22], energy: "As an Air sign, you seek balance and harmony. Adequate sleep helps maintain judgment and balance energy in various relationships." },
        { name: "Scorpio", symbol: "♏", emoji: "🦂", start: [10, 23], end: [11, 21], energy: "As a Water sign, you have powerful insight. Good sleep enhances your intuitive energy and helps you see through to the essence of things." },
        { name: "Sagittarius", symbol: "♐", emoji: "🏹", start: [11, 22], end: [12, 21], energy: "As a Fire sign, you're full of exploratory spirit. Quality sleep helps maintain abundant energy as you continue pursuing ideals and truth." }
    ];

    const getMonthDay = (month, day) => month * 100 + day;
    const date = getMonthDay(month, day);
    
    for (let sign of zodiacSigns) {
        const start = getMonthDay(sign.start[0], sign.start[1]);
        const end = getMonthDay(sign.end[0], sign.end[1]);
        
        if (sign.name === "Capricorn") {
            if (date >= start || date <= end) return sign;
        } else {
            if (date >= start && date <= end) return sign;
        }
    }
}

function getEnergyAdvice(age) {
    if (age < 18) {
        return "During your growth phase, adequate sleep is crucial for developing your energy field. Quality sleep during this period helps build a strong foundation of life energy and promotes healthy physical and mental development.";
    } else if (age < 30) {
        return "This is your most energetically active period. Good sleep habits help you better channel and utilize this powerful energy, allowing you to reach your full potential in career and life.";
    } else if (age < 50) {
        return "At this life stage, balanced sleep rhythms help maintain a stable energy field, keeping you at your best to handle various challenges in work and life.";
    } else {
        return "Sleep quality becomes increasingly important for maintaining energy field stability. Adequate rest helps maintain vitality, slow aging, and continue enjoying a rich and colorful life.";
    }
}

class Star {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
    }

    reset() {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.z = Math.random() * 1000;
        this.opacity = Math.random() * 0.8 + 0.2; // Increase minimum brightness
    }

    update(speed) {
        this.z -= speed;
        if (this.z <= 0) {
            this.reset();
        }

        this.screenX = (this.x - this.canvas.width / 2) * (600 / this.z) + this.canvas.width / 2;
        this.screenY = (this.y - this.canvas.height / 2) * (600 / this.z) + this.canvas.height / 2;
        
        this.opacity = Math.min(Math.max((1000 - this.z) / 1000, 0.2), 0.8); // Control opacity range
        this.size = (1 - this.z / 1000) * 2; // Reduce maximum star size
    }
}

function initStarfield() {
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    const stars = [];
    const numStars = 250; // Slightly reduce the number of stars
    const speed = 2.5; // Slightly increase the speed

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStars() {
        for (let i = 0; i < numStars; i++) {
            stars.push(new Star(canvas));
        }
    }

    function animate() {
        // Use a semi-transparent black to cover the canvas, creating a trailing effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.update(speed);
            
            if (star.screenX >= 0 && star.screenX <= canvas.width &&
                star.screenY >= 0 && star.screenY <= canvas.height) {
                
                // Draw the main star
                ctx.beginPath();
                ctx.arc(star.screenX, star.screenY, star.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();

                // Draw the tail
                const tailLength = (1 - star.z / 1000) * 10; // Tail length changes with distance
                if (tailLength > 0.5) {
                    ctx.beginPath();
                    ctx.moveTo(star.screenX, star.screenY);
                    ctx.lineTo(
                        star.screenX + (tailLength * (star.x - canvas.width/2) / star.z),
                        star.screenY + (tailLength * (star.y - canvas.height/2) / star.z)
                    );
                    ctx.strokeStyle = `rgba(255, 255, 255, ${star.opacity * 0.5})`;
                    ctx.lineWidth = star.size * 0.8;
                    ctx.stroke();
                }
            }
        });

        animationFrameId = requestAnimationFrame(animate);
    }

    // Event listeners
    window.addEventListener('resize', resizeCanvas);

    // Initialize
    resizeCanvas();
    createStars();
    animate();

    // Cleanup function
    return () => {
        window.removeEventListener('resize', resizeCanvas);
        cancelAnimationFrame(animationFrameId);
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const cleanupStarfield = initStarfield();
    
    const yearInput = document.getElementById('year');
    const monthInput = document.getElementById('month');
    const dayInput = document.getElementById('day');
    const calculateButton = document.querySelector('.calculate-button');
    const resultDiv = document.getElementById('result');
    
    // Auto-focus on the next input field
    yearInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
        if (this.value.length >= 4) {
            monthInput.focus();
        }
    });

    monthInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
        if (parseInt(this.value) > 12) {
            this.value = '12';
        }
        if (this.value.length >= 2) {
            dayInput.focus();
        }
    });

    dayInput.addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
        if (parseInt(this.value) > 31) {
            this.value = '31';
        }
    });

    // Enter key triggers calculation
    [yearInput, monthInput, dayInput].forEach(input => {
        input.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calculateAge();
            }
        });
    });
});
