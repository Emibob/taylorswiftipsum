describe("the lingo dictionary", function(){
	
	beforeEach(function(){
		var lingo = window.lingo;
	});

	describe("when the lingo library is loaded", function(){
		it("contains the array ts", function(){
			expect(lingo.ts.length).toBeGreaterThan(0);
		});
		it("contains the array nineteenEightyNine", function(){
			expect(lingo.nineteenEightyNine.length).toBeGreaterThan(0);
		});
		it("contains the array red", function(){
			expect(lingo.red.length).toBeGreaterThan(0);
		});
		it("contains the array speakNow", function(){
			expect(lingo.speakNow.length).toBeGreaterThan(0);
		});
		it("contains the array fearless", function(){
			expect(lingo.fearless.length).toBeGreaterThan(0);
		});
		it("contains the array taylorSwift", function(){
			expect(lingo.taylorSwift.length).toBeGreaterThan(0);
		});
		it("contains the array soundsoftheseason", function(){
			expect(lingo.soundsoftheseason.length).toBeGreaterThan(0);
		});
	});	
});