// egy arrowFunction-ba elmentjük, hogy az URL-t átalakítsa, és ne kelljen mindig beírnunk
const parseJSON = async (url) => {
    const response = await fetch(url);
    return response.json();
};

// user destructuring-el hozzuk létre a paramétereket -> objektumból csak 2 kulcsát használjuk fel
const userComponents = ({name, surname}) => {
    return `
        <div>
            <h1>${name}</h1>
            <h2>${surname}</h2>
        </div>
    `
};

const loadEvent = async () => {

    const root = document.getElementById('root');
    const result = await parseJSON('/api/v1/users');

    root.insertAdjacentHTML(
        'beforeend', 
        result.map(user => userComponents(user)).join('')
        )
};

window.addEventListener('load', loadEvent);