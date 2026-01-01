
async function test() {
    try {
        const res = await fetch('http://localhost:5000/api/gemini/refine-event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                rawDescription: "Test event",
                guestCount: 50,
                location: "Delhi"
            })
        });

        console.log('Status:', res.status);
        const text = await res.text();
        console.log('Body:', text);
    } catch (err) {
        console.error('Error:', err);
    }
}

test();
