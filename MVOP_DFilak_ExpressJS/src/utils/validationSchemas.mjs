export const createCompanyValidationSchema = {
    rank: {
      notEmpty: {
        errorMessage: "Rank je zahtevan!"
      },
      isInt: {
        options: {
          min: 1, 
          max: 500
        },
        errorMessage: "Rank mora imeti celoštevilčno vrednost med 1 and 500!"
      }
    },
    ime: {
      notEmpty: {
        errorMessage: "Ime je zahtevano!"
      },
      isLength: {
        options: {
          min: 2
        },
        errorMessage: "Ime mora imeti vsaj 2 črki!"
      }
    },
    prihodek: {
      notEmpty: {
        errorMessage: "Prihodek je zahtevan!"
      },
      matches: {
        options: [/^\d+(\.\d{1,2})?$/],
        errorMessage: "Prihodek mora biti celoštevilčen ali decimalen (do 2 decimalki)!"
      }
    },
    dobicek: {
      notEmpty: {
        errorMessage: "Dobiček je zahtevan!"
      },
      matches: {
        options: [/^\d+(\.\d{1,2})?$/],
        errorMessage: "Dobiček mora biti celoštevilčen ali decimalen (do 2 decimalki)!"
      }
    },
    sredstva: {
      notEmpty: {
        errorMessage: "Sredstva so zahtevana!"
      },
      matches: {
        options: [/^\d+(\.\d{1,2})?$/],
        errorMessage: "Sredstva morajo biti celoštevilčna ali decimalna (do 2 decimalki)!"
      }
    },
    stZaposlenih: {
      notEmpty: {
        errorMessage: "Št. zaposlenih je zahtevano!"
      },
      isInt: {
        errorMessage: "Št. zaposlenih mora biti celoštevilčna vrednost!" 
      }
    }
}
