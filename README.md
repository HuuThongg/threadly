    "prettier/prettier": ["error"],
const scrollStyle =
    'scrollbar-thumb-fifth-clr scrollbar-track-transparent hover:scrollbar-track-[#2c2d2f]  scrollbar   scrollbar-w-2 scrollbar-thumb-rounded-md';

npx node-pg-migrate --config config/default.js create sqm --
migration-file-language=sql
