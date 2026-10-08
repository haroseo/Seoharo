import type { Copy } from './portfolioContent';

export interface DesignScreen {
  id: string;
  title: Copy;
  format: 'web' | 'mobile';
  image: string;
  width: number;
  height: number;
  function: Copy;
  rationale: Copy;
}
export interface DesignCaseStudy {
  slug: string;
  source: Copy;
  disclaimer: Copy;
  screens: readonly DesignScreen[];
}
const copy = (ko: string, en: string): Copy => ({ ko, en });
function oneToZScreen(id: string, title: Copy, width: number, height: number, functionality: Copy, rationale: Copy): DesignScreen {
  return { id, title, format: width === 390 ? 'mobile' : 'web', image: `/assets/one-to-z/one-to-z-${id}.webp`, width, height, function: functionality, rationale };
}

// Original Figma exports, not live storefronts. Rationale is interpretation.
export const oneToZCaseStudy: DesignCaseStudy = {
  slug: 'one-to-z',
  source: copy('Figma 원본 · 웹 5개 / 모바일 13개', 'Original Figma designs · 5 web / 13 mobile screens'),
  disclaimer: copy('디자인 시안입니다. 화면 속 상품, 가격, 리뷰, 주문·회원·회사 정보는 시안의 예시이며, 실제 서비스 운영이나 실적을 뜻하지 않습니다. 구성 이유는 화면을 바탕으로 정리한 해석입니다.', 'Design prototype. Products, prices, reviews, orders, member and company information shown belong to the example design, not a live service or verified results. Layout rationale is an interpretation of the screens.'),
  screens: [
    oneToZScreen('20-11859', copy('쇼핑 웹사이트', 'Shopping website'), 1301, 4096,
      copy('상품 카테고리, 검색과 브랜드·에디토리얼 콘텐츠를 한 홈에서 보여주는 의류 플랫폼 시안입니다.', 'A clothing-platform homepage combining category navigation, search, products, brands and editorial content.'),
      copy('제품만 나열하지 않고 이미지와 이야기를 함께 배치해, 취향을 발견한 뒤 상품으로 이동하는 흐름을 읽을 수 있습니다.', 'Products are paired with imagery and stories, suggesting a path from finding a style to exploring its products.')),
    oneToZScreen('20-12142', copy('브랜드 소개 사이트', 'Platform introduction'), 1124, 4096,
      copy('1 to Z의 소개와 이미지 중심 섹션을 길게 이어가는 브랜드 소개 화면입니다.', 'A long-form introduction to 1 to Z with image-led sections.'),
      copy('쇼핑 화면과 소개 화면을 분리해 서비스의 분위기와 지향점을 설명할 공간을 둔 구성입니다.', 'Separating the introduction from shopping gives the platform space to express its character and direction.')),
    oneToZScreen('31-14515', copy('웹 상품 목록', 'Web product listing'), 1440, 2234,
      copy('왼쪽 필터에서 카테고리·브랜드·가격·컬러를 선택하고, 오른쪽에서 상품과 선택된 조건을 확인하는 화면입니다.', 'A left-hand filter for category, brand, price and color alongside products and active filter chips.'),
      copy('탐색 조건과 결과를 동시에 볼 수 있게 나누고, 선택 조건을 칩으로 다시 보여줘 현재 목록의 기준을 확인하기 쉽습니다.', 'Keeping filters beside results and showing active chips clarifies why these products are displayed.')),
    oneToZScreen('31-14780', copy('웹 블레이저 상세', 'Web blazer detail'), 1277, 4096,
      copy('블레이저 상품의 이미지와 구매 정보를 시작으로 상세 콘텐츠를 길게 보여주는 웹 상품 페이지입니다.', 'A web product page beginning with blazer imagery and purchase information, followed by extended details.'),
      copy('목록에서 생긴 관심을 제품 확인과 구매 검토로 이어가는 단계입니다. 긴 정보는 이미지를 새 창으로 열어 확인할 수 있습니다.', 'This connects discovery to closer inspection and purchase consideration; open the full image to inspect the longer details.')),
    oneToZScreen('31-15105', copy('웹 에디토리얼 아티클', 'Web editorial article'), 898, 4096,
      copy('사진과 긴 글로 브랜드·스타일의 이야기를 풀어내는 웹 에디토리얼 화면입니다.', 'A long-form web editorial screen telling a brand and style story through photographs and text.'),
      copy('빠른 상품 탐색과 별도로 충분히 읽을 수 있는 콘텐츠 영역을 두어, 제품을 선택할 맥락을 보여주는 구성입니다.', 'A separate reading experience provides context for the products, alongside the faster shopping flow.')),
    oneToZScreen('20-11372', copy('앱 홈', 'Mobile home'), 390, 1254,
      copy('모바일 첫 화면에서 상품과 콘텐츠를 소개하고 하단 내비게이션으로 주요 영역에 진입하는 시안입니다.', 'A mobile entry screen introducing products and content with bottom navigation to the main areas.'),
      copy('작은 화면에서는 핵심 콘텐츠를 세로로 이어 배치하고 주요 이동 위치를 반복해 보여줍니다.', 'A vertical content flow keeps the small screen readable while navigation remains consistent.')),
    oneToZScreen('20-11483', copy('카테고리', 'Mobile categories'), 390, 1522,
      copy('전체·의류·가방·슈즈·라이프 탭, 브랜드·가격·컬러 필터와 2열 상품 목록을 보여줍니다.', 'Category tabs, brand/price/color filters and a two-column product grid.'),
      copy('필터를 상단에 모으고 적용 조건을 칩으로 남겨, 화면이 좁아도 목록의 기준을 되짚을 수 있도록 구성했습니다.', 'Grouping controls above the grid and keeping active chips visible clarifies the selection on a narrow screen.')),
    oneToZScreen('20-11622', copy('에디토리얼 발견', 'Editorial discovery'), 390, 1259,
      copy('쇼핑과 구분되는 발견 영역에서 이미지와 에디토리얼 콘텐츠를 탐색하는 모바일 화면입니다.', 'A mobile discovery area for image-led editorial content, distinct from the shopping list.'),
      copy('이야기로 취향을 발견하는 경로를 상품 검색과 별도로 둔 점이 이 화면의 역할입니다.', 'It creates another way to discover a style through stories rather than product search alone.')),
    oneToZScreen('31-13532', copy('검색', 'Search'), 390, 1042,
      copy('검색어를 입력하며 원하는 상품이나 브랜드를 찾아가는 진입 화면입니다.', 'An entry screen for finding products or brands by a search term.'),
      copy('탐색 시작과 결과 확인을 분리하면 사용자가 어떤 대상을 찾는지 먼저 정리할 수 있습니다.', 'Separating search entry from its results gives the user a clear starting point.')),
    oneToZScreen('31-13648', copy('검색 결과', 'Search results'), 390, 1537,
      copy('입력한 검색어에 대응하는 결과를 모바일 목록으로 보여주는 시안입니다.', 'A mobile list presenting results for a search term.'),
      copy('카테고리 탐색과 유사한 상품 표현을 사용해 검색 이후에도 익숙한 방식으로 비교할 수 있는 구성입니다.', 'Using a familiar product-list presentation supports comparison after searching.')),
    oneToZScreen('20-11694', copy('상품 상세', 'Mobile product detail'), 390, 1393,
      copy('상품 사진, 할인 가격·쿠폰, 배송 안내, 컬러·사이즈 선택과 하단 장바구니·구매 버튼을 보여줍니다.', 'Product photography, pricing and coupon, delivery information, color/size selection and cart/purchase actions.'),
      copy('제품 확인 → 옵션 선택 → 구매 검토 순서로 정보를 배열하고, 마지막 행동은 하단에 모아 구분했습니다.', 'Information follows inspection, option selection and purchase consideration, with final actions grouped at the bottom.')),
    oneToZScreen('31-13922', copy('오브젝트 스튜디오', 'Object Studio'), 390, 1867,
      copy('브랜드 소개, 브랜드 찜, 이야기·전체 상품·컬렉션 탭과 관련 상품을 담은 브랜드 화면입니다.', 'A brand screen with its introduction, follow action, story/products/collection tabs and related products.'),
      copy('브랜드의 이야기와 상품을 한 화면에 연결해, 소개를 읽은 뒤 같은 브랜드의 제품을 찾기 쉽게 구성했습니다.', 'Connecting the brand story and products creates a path from reading the introduction to browsing the collection.')),
    oneToZScreen('31-13795', copy('찜', 'Saved items'), 390, 1443,
      copy('관심을 표시한 상품을 다시 찾아보는 모바일 찜 목록 시안입니다.', 'A mobile saved-items screen for returning to products of interest.'),
      copy('발견 즉시 구매하지 않아도 후보를 모아 비교할 수 있는 별도 경로를 제공합니다.', 'It offers a way to collect and compare candidates without an immediate purchase.')),
    oneToZScreen('20-11774', copy('장바구니', 'Cart'), 390, 1042,
      copy('선택한 상품과 주문 정보를 확인하고 결제 단계로 이어지는 장바구니 화면입니다.', 'A cart screen for reviewing selected products before continuing to checkout.'),
      copy('탐색과 결제 사이에 검토 단계를 두어 구매 대상을 다시 확인할 수 있게 구성했습니다.', 'A review step between browsing and payment lets the user confirm the intended order.')),
    oneToZScreen('31-14020', copy('주문·결제', 'Checkout'), 390, 1817,
      copy('배송지, 주문 상품, 쿠폰·적립금, 결제 수단과 최종 결제 금액을 차례로 확인하는 화면입니다.', 'A sequential review of delivery, order items, benefits, payment method and final total.'),
      copy('정보를 구획별로 나누고 최종 금액과 버튼을 마지막에 배치해, 확인해야 할 내용과 결제 행동을 구분했습니다.', 'Separate sections organize the information; the total and final action come after the review.')),
    oneToZScreen('31-14147', copy('주문 완료', 'Order confirmation'), 390, 1375,
      copy('주문 완료 상태를 알리고 주문 이후의 확인 흐름을 보여주는 모바일 시안입니다.', 'A mobile confirmation screen communicating completion and the post-order flow.'),
      copy('결제 입력 단계와 완료 상태를 분리해, 사용자가 현재 단계가 끝났다는 점을 인지하도록 구성했습니다.', 'A distinct confirmation state makes the end of the checkout step recognizable.')),
    oneToZScreen('31-14226', copy('마이페이지', 'My account'), 390, 1364,
      copy('적립금·쿠폰·찜, 주문 단계와 배송 중인 상품, 취향·리뷰·배송지 관리 메뉴를 모은 화면입니다.', 'An account screen with benefits, saved items, order stages, products in transit and management menus.'),
      copy('요약 숫자와 주문 상태를 앞에 두고 관리 메뉴를 뒤에 배치해, 현재 필요한 확인과 계정 관리를 나눴습니다.', 'Summaries and current orders come first, with account management below.')),
    oneToZScreen('31-14363', copy('주문 상세·배송 조회', 'Order detail and tracking'), 390, 2108,
      copy('브랜드별 배송 단계와 이동 기록, 주문 상품, 배송지와 결제 내역을 확인하는 화면입니다.', 'An order screen with shipment stages and events by brand, ordered products, delivery and payment details.'),
      copy('브랜드별로 배송 블록을 분리해 한 주문의 상품들이 서로 다른 상태일 수 있다는 점을 보여줍니다.', 'Separate shipment blocks communicate that products in one order can have different delivery states.')),
  ],
};
function designgraphyScreen(id: string, title: Copy, height: number, functionality: Copy, rationale: Copy): DesignScreen {
  return { id: `dg-${id}`, title, format: 'web', image: `/assets/designgraphy/${id}.webp`, width: 1710, height, function: functionality, rationale };
}

export const designgraphyCaseStudy: DesignCaseStudy = {
  slug: 'designgraphy',
  source: copy('Claude 원본 사이트 · 주요 화면 12개', 'Original Claude prototype · 12 key screens'),
  disclaimer: copy('공유된 Claude 사이트의 실제 화면을 가져왔습니다. Figma의 디자인 창고 시안과는 다른 버전입니다. 화면 속 아카이브 수와 자료 설명은 원본 표시이며 전체 정확성을 별도로 검증한 것은 아닙니다. 준비 중 메뉴와 미정리 상세도 그대로 구분했습니다. 구성 이유는 화면을 바탕으로 한 해석입니다.', 'Captured from the shared Claude prototype, separate from the Figma Design Archive version. Archive counts and guide descriptions are source content, not independently validated facts. Coming-soon sections and incomplete details remain distinguishable. Layout rationale is an interpretation.'),
  screens: [
    designgraphyScreen('home', copy('홈페이지', 'Homepage'), 1719,
      copy('검색창, 국내·해외 기업과 대학의 분류, 대표 레퍼런스와 전체 목록 진입을 보여주는 첫 화면입니다.', 'The entry screen combines search, domestic/international company and university categories, featured references and access to the full index.'),
      copy('목적이 정해진 사용자는 검색으로, 아직 찾는 자료가 없는 사용자는 분류와 대표 자료로 시작할 수 있게 두 경로를 나눴습니다.', 'Search supports a specific goal, while categories and featured references offer a starting point for browsing.')),
    designgraphyScreen('guides', copy('디자인 가이드 전체 목록', 'All design guides'), 1617,
      copy('지역·기관 필터, 결과 내 재검색, 자료 카드와 페이지 이동을 담은 목록입니다. 원본의 첫 페이지를 보여줍니다.', 'A guide index with region/type filters, search within results, reference cards and pagination. This capture shows its first page.'),
      copy('필터와 자료를 좌우로 나눠 탐색 조건을 유지하면서 결과를 비교할 수 있는 구성입니다.', 'Filters sit beside the results so users can retain their selection while comparing references.')),
    designgraphyScreen('domestic', copy('국내 기업 디자인 가이드', 'Domestic company guides'), 1617,
      copy('홈에서 국내 기업을 선택했을 때의 목록입니다. 지역과 기관 유형의 선택 상태가 표시됩니다.', 'The filtered list reached from the domestic-company category, with the selected region and institution type shown.'),
      copy('전체 목록과 같은 레이아웃 안에서 선택 상태만 달라져, 분류를 바꿔도 탐색 방식이 이어집니다.', 'The same index layout preserves a familiar browsing pattern as the category changes.')),
    designgraphyScreen('global-universities', copy('해외 대학 디자인 가이드', 'International university guides'), 1615,
      copy('해외 대학의 레퍼런스를 모은 필터 결과이며 자료 목록과 페이지 이동을 확인할 수 있습니다.', 'A filtered list for international universities, including reference cards and pagination.'),
      copy('기업과 대학을 같은 정보 구조로 다루되 분류를 분명히 보여줘 서로 다른 자료를 비교할 수 있도록 구성했습니다.', 'A shared structure makes different source types comparable, while visible categories keep them distinct.')),
    designgraphyScreen('search', copy('검색 결과 · 블루', 'Search results · blue'), 929,
      copy('원본에서 블루를 검색했을 때 결과 수, 재검색 입력, 분류 필터와 토스 자료가 표시된 화면입니다.', 'The actual result state for a search for blue, showing a count, search input, filters and the Toss reference.'),
      copy('어떤 검색으로 나온 결과인지 제목에 남기고, 결과 안에서도 범위를 좁힐 수 있게 구성했습니다.', 'The heading retains the search context and filters offer a way to refine its results.')),
    designgraphyScreen('search-empty', copy('검색 결과 없음', 'No search results'), 929,
      copy('일치하는 자료가 없을 때 검색어 확인 안내, 필터 초기화와 홈으로 돌아가기 링크를 보여줍니다.', 'The empty state offers spelling guidance, a filter reset and a way back home.'),
      copy('빈 결과로 흐름이 끝나지 않게 다시 탐색할 수 있는 선택지를 제공합니다.', 'Recovery links keep an unsuccessful search from ending the browsing flow.')),
    designgraphyScreen('toss', copy('토스 가이드 상세', 'Toss guide detail'), 1193,
      copy('태그, 가이드 요약, 컬러·타이포그래피·핵심 원칙과 원문 링크가 정리된 상세 화면입니다.', 'A detailed reference screen with tags, summary, color, typography, principles and the source link.'),
      copy('자료를 읽는 화면과 공식 원문으로 이동하는 행동을 구분해, 아카이브와 자료 제공 기관의 역할을 나눴습니다.', 'The reference summary and the action to open its source are distinct, separating the archive from the source institution.')),
    designgraphyScreen('google', copy('Google 가이드 상세', 'Google guide detail'), 929,
      copy('요약, 대표 컬러, 태그와 공식 원문 링크를 보여주며 심화 정리가 아직 되지 않았다고 명시한 화면입니다.', 'A summary, representative color, tags and official link, with an explicit notice that deeper documentation is incomplete.'),
      copy('상세 내용이 없는 상태를 채워 넣지 않고 안내로 구분해, 방문자가 원문에서 확인하도록 연결했습니다.', 'The incomplete state is disclosed instead of filled with invented details; the original source remains available.')),
    designgraphyScreen('snu', copy('서울대학교 가이드 상세', 'Seoul National University detail'), 929,
      copy('대학 자료의 요약, 태그·대표 컬러와 공식 원문 링크를 보여주는 상세 화면입니다.', 'A university reference detail with a summary, tags, representative color and official source link.'),
      copy('기업 자료와 동일한 상세 구조를 사용해 기관 유형이 달라도 정보를 찾는 위치가 일정합니다.', 'Using the same detail structure as company references keeps information in predictable positions.')),
    designgraphyScreen('about', copy('서비스 소개', 'Service introduction'), 1613,
      copy('서비스를 만든 이유, 자료 분류, 준비 중인 영역과 운영 원칙을 소개하는 화면입니다.', 'An introduction explaining the service purpose, source categories, planned areas and operating principles.'),
      copy('사용 가능한 기능과 이후 계획을 함께 보여주되 상태를 나눠, 현재 제공 범위를 읽을 수 있게 구성했습니다.', 'Available areas and future plans are shown with different status labels to make the current scope clear.')),
    designgraphyScreen('palette-soon', copy('컬러 팔레트 · 준비 중', 'Color palettes · coming soon'), 929,
      copy('컬러 팔레트는 아직 준비 중이라고 안내하고 사용 가능한 디자인 가이드로 연결합니다.', 'The palette section is explicitly coming soon and links to the available design guides.'),
      copy('완성되지 않은 메뉴의 현재 상태를 알리고, 대신 이용할 수 있는 경로를 남긴 구성입니다.', 'The unfinished state is disclosed while an alternative usable path remains available.')),
    designgraphyScreen('typography-soon', copy('타이포그래피 · 준비 중', 'Typography · coming soon'), 929,
      copy('타이포그래피 메뉴의 준비 중 상태와 디자인 가이드로 이동하는 링크를 보여줍니다.', 'The typography section shows its coming-soon state and a link to the guide index.'),
      copy('같은 준비 중 화면을 사용해 완료되지 않은 영역의 안내 방식도 일관되게 구성했습니다.', 'A shared coming-soon pattern keeps unfinished areas consistent.')),
  ],
};
export const designCaseStudies: readonly DesignCaseStudy[] = [oneToZCaseStudy, designgraphyCaseStudy];
export function getDesignCaseStudy(slug: string) {
  return designCaseStudies.find(study => study.slug === slug);
}
