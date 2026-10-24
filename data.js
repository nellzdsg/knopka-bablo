/* Контент сайта. Чтобы добавить бота — добавь объект в items нужной категории. */
window.SITE = {
  updated: '2026-10-24',
  updatedLabel: '24 октября 2026',

  categories: [
    {
      id: 'steam',
      title: 'STEAM',
      icon: 'steam',
      tone: 'steam',
      note: 'Нужен аккаунт Steam. Скины и предметы приходят прямо в инвентарь.',
      items: [
        {
          name: 'SkinSetup',
          desc: 'Скины CS2, апгрейд инвентаря и бонус новичку',
          badge: 'скины',
          icon: 'swords',
          tone: 'skins',
          url: 'https://t.me/skinsetup_bot?startapp=ref_1255193535',
        },
        {
          name: 'RPlayz',
          desc: 'Кейсы и рулетка на предметы Steam',
          badge: 'кейсы',
          icon: 'package',
          tone: 'cases',
          url: 'https://t.me/RPlayz_bot?start=A1NQUwFbB1NRVw==',
        },
      ],
    },
    {
      id: 'nft-gifts',
      title: 'NFT GIFTS',
      icon: 'telegram',
      tone: 'nft',
      note: 'Достаточно Telegram: подарки — это NFT-стикеры внутри Telegram.',
      items: [
        {
          name: 'Case24',
          desc: 'Кейсы и рулетка с NFT-подарками',
          badge: 'кейсы',
          icon: 'boxes',
          tone: 'roulette',
          url: 'https://t.me/virus_play_bot/app?startapp=roulette_inviteCodebH6KGdXDO7K4zKil',
        },
        {
          name: 'Chance',
          desc: 'Рулетка подарков и розыгрыши для новичков',
          badge: 'рулетка',
          icon: 'dices',
          tone: 'cases',
          url: 'https://t.me/ChanceAppBot?startapp=ref1255193535',
        },
        {
          name: 'Trade',
          desc: 'Маркет NFT-подарков: покупка и обмен',
          badge: 'маркет',
          icon: 'exchange',
          tone: 'market',
          url: 'https://t.me/trade/app?startapp=ref_byLj8LSDxhTH9otC',
        },
        {
          name: 'Agent301',
          desc: 'Кейсы, подарки и ежедневный фарм',
          badge: 'фарм',
          icon: 'bot',
          tone: 'agent',
          url: 'https://t.me/Agent301Bot/app?startapp=ref_FTdXjZ',
        },
        {
          name: 'Banda Gift',
          desc: 'Фриспины в рулетке подарков',
          badge: 'фриспины',
          icon: 'gift',
          tone: 'gift',
          url: 'https://t.me/bandagiftbot/app?startapp=openRouletteMain_inviteCodeLP4zUEIon8QrCmX6_adSegmentCode=freespininlineshare44',
        },
      ],
    },
    {
      id: 'cash',
      title: 'CASH',
      icon: 'wallet',
      tone: 'cash',
      note: 'Условия и выплаты — внутри бота.',
      items: [
        {
          name: 'Jobseo',
          desc: 'Заработок и задания внутри Telegram',
          badge: 'заработок',
          icon: 'briefcase',
          tone: 'cash',
          url: 'https://telegram.me/jobseo_bot?start=user1255193535',
        },
      ],
    },
  ],

  faq: [
    {
      q: 'Это правда бесплатно?',
      a: 'Да. Боты дают новичкам бесплатный кейс, спин или подарок — депозит для первого бонуса не нужен. Но и «заработать миллион за минуту» никто не обещает: халява ограничена условиями бота, а дальше всё зависит от твоего везения.',
    },
    {
      q: 'Почему ссылки реферальные?',
      a: 'В каждой ссылке есть мой код. Ты получаешь ровно тот же бонус, что и при обычной регистрации, а бот начисляет мне небольшой бонус за приведённого человека. Цена для тебя не меняется — на этом и живёт сайт.',
    },
    {
      q: 'Нужен ли Steam?',
      a: 'Для раздела STEAM — да, понадобится аккаунт Steam: предметы зачисляются в твой инвентарь. Для NFT-подарков ничего, кроме Telegram, не нужно.',
    },
    {
      q: 'Это безопасно?',
      a: 'Сайт не просит пароли, не собирает данные и ничего не устанавливает на устройство. Дальше ты общаешься напрямую с ботом — оценивай его сам и никогда не вводи сид-фразу Steam и коды подтверждения.',
    },
    {
      q: 'Депозит всё-таки попросят?',
      a: 'Бесплатный бонус — без депозита. Если бот начинает требовать пополнение, чтобы «разблокировать вывод», — это красный флаг, закрывай его. В список попадают боты, которые я проверил лично, но правила у них меняются.',
    },
    {
      q: 'Сколько это занимает времени?',
      a: 'Две-три минуты: открыть бота, пройти регистрацию внутри Telegram, забрать бонус. Дальше — по желанию.',
    },
  ],
};
