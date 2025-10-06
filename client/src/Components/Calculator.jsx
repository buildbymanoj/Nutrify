import { useState } from 'react';
import Header from './Header';

export default function Calculator() {
    const [bmiInputs, setBmiInputs] = useState({ weight: '', height: '' });
    const [bmiResult, setBmiResult] = useState(null);

    const [calInputs, setCalInputs] = useState({ age: '', gender: 'male', weight: '', height: '', activity: '1.2' });
    const [calResult, setCalResult] = useState(null);

    function handleBmiChange(e) {
        setBmiInputs({ ...bmiInputs, [e.target.name]: e.target.value });
    }

    function calcBmi(e) {
        e.preventDefault();
        const weight = parseFloat(bmiInputs.weight);
        const heightCm = parseFloat(bmiInputs.height);
        if (!weight || !heightCm) {
            setBmiResult({ error: 'Please enter valid weight and height' });
            return;
        }
        const heightM = heightCm / 100;
        const bmi = weight / (heightM * heightM);
        let category = '';
        let color = '';
        let quote = '';
        if (bmi < 18.5) {
            category = 'Underweight'; color = '#2196F3';
            quote = 'You\'re on a journey to strength! Focus on nourishing your body with balanced meals and gentle exercises. Every step counts towards your vibrant health!';
        } else if (bmi < 25) {
            category = 'Normal'; color = '#4CAF50';
            quote = 'Fantastic! You\'re in the healthy zone. Keep up the great work with your balanced lifestyle and continue making choices that fuel your well-being!';
        } else if (bmi < 30) {
            category = 'Overweight'; color = '#FFC107';
            quote = 'You\'re close to your goal! Small, consistent changes in diet and activity can make a big difference. You\'ve got this - keep pushing forward!';
        } else {
            category = 'Obese'; color = '#F44336';
            quote = 'Your health transformation starts now! Every healthy choice you make is a victory. Believe in yourself and take it one day at a time - you\'re capable of amazing changes!';
        }
        setBmiResult({ bmi: bmi.toFixed(1), category, color, quote });
    }

    function handleCalChange(e) {
        setCalInputs({ ...calInputs, [e.target.name]: e.target.value });
    }

    function calcCalories(e) {
        e.preventDefault();
        const age = parseFloat(calInputs.age);
        const weight = parseFloat(calInputs.weight);
        const height = parseFloat(calInputs.height);
        const gender = calInputs.gender;
        const activity = parseFloat(calInputs.activity);

        if (!age || !weight || !height) {
            setCalResult({ error: 'Please provide age, weight and height' });
            return;
        }

        // Mifflin-St Jeor Equation
        let bmr = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
        const maintenance = Math.round(bmr * activity);
        setCalResult({ bmr: Math.round(bmr), maintenance });
    }

    return (
        <section className="container">
            <Header />

            <div className="calculator-grid">
                {/* BMI Calculator */}
                <div className="calculator-section">
                    <h2>BMI Calculator</h2>
                    <form onSubmit={calcBmi} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <input className="inp" name="weight" placeholder="Weight (kg)" value={bmiInputs.weight} onChange={handleBmiChange} />
                        <input className="inp" name="height" placeholder="Height (cm)" value={bmiInputs.height} onChange={handleBmiChange} />
                        <button className="btn" type="submit">Calculate BMI</button>
                    </form>

                    {bmiResult && (
                        <div style={{ marginTop: 12 }}>
                            {bmiResult.error ? (
                                <p className="error">{bmiResult.error}</p>
                            ) : (
                                <div>
                                    <h3>Result: <span style={{ color: bmiResult.color }}>{bmiResult.bmi}</span></h3>
                                    <p>Category: <strong style={{ color: bmiResult.color }}>{bmiResult.category}</strong></p>
                                    <p style={{ fontStyle: 'italic', marginTop: 8, color: 'var(--text-secondary)' }}>{bmiResult.quote}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Calorie Calculator */}
                <div className="calculator-section">
                    <h2>Calorie Calculator (Mifflin-St Jeor)</h2>
                    <form onSubmit={calcCalories} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <input className="inp" name="age" placeholder="Age (years)" value={calInputs.age} onChange={handleCalChange} />
                        <select name="gender" value={calInputs.gender} onChange={handleCalChange} className="inp gender">
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <input className="inp" name="weight" placeholder="Weight (kg)" value={calInputs.weight} onChange={handleCalChange} />
                        <input className="inp" name="height" placeholder="Height (cm)" value={calInputs.height} onChange={handleCalChange} />

                        <label style={{ color: 'var(--text-secondary)', marginTop: 8 }}>Activity level</label>
                        <select name="activity" value={calInputs.activity} onChange={handleCalChange} className="inp">
                            <option value="1.2">Sedentary (little or no exercise)</option>
                            <option value="1.375">Lightly active (1-3 days/week)</option>
                            <option value="1.55">Moderately active (3-5 days/week)</option>
                            <option value="1.725">Very active (6-7 days/week)</option>
                            <option value="1.9">Extra active (physical job or 2x training)</option>
                            <option value="2.1">Professional athlete (intense daily training)</option>
                            <option value="2.4">Elite athlete (extreme training)</option>
                            <option value="1.0">Bedridden or inactive</option>
                            <option value="1.3">Office worker (minimal activity)</option>
                            <option value="1.6">Active lifestyle (daily exercise)</option>
                        </select>

                        <button className="btn" type="submit">Calculate Calories</button>
                    </form>

                    {calResult && (
                        <div style={{ marginTop: 12 }}>
                            {calResult.error ? (
                                <p className="error">{calResult.error}</p>
                            ) : (
                                <div>
                                    <p>BMR: <strong>{calResult.bmr} kcal/day</strong></p>
                                    <p>Maintenance: <strong>{calResult.maintenance} kcal/day</strong></p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}
