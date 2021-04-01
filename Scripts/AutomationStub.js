
var i = 0;
var j = 0;

function automationStub(type) {

   switch (type) {
        case "metal":
            i += 5;
            return i;
        case "food":
            j+= 101;
            if (j > 100) {
                j = 100;
            }
            return j;
        default:
            return null;
   }
}

module.exports = automationStub;