export default function checkPrevNextPages(pages) {

    if (!pages) {
        return
    }

    if ( pages.length === 2 ) {
        const prevPage = pages[0].href.split('&')[0].split('=')[1];
        const nextPage = pages[1].href.split('&')[0].split('=')[1];
        return [prevPage, nextPage]
    } else if (pages.length === 1) {
        if (pages[0].rel === 'prev') {
            const prevPage = pages[0].href.split('&')[0].split('=')[1];
            return ['prev', prevPage]
        } else if (pages[0].rel === 'next') {
            const nextPage = pages[0].href.split('&')[0].split('=')[1];
            return ['next', nextPage]
        }
    }
};