
        const form = document.getElementById("billingForm");
        const promoCode = document.getElementById("promoCode");
        const promoRow = document.getElementById("promoRow");
        const totalPrice = document.getElementById("totalPrice");
        let orginalPrice = 25;

        function promoCodefun(){
              const codeInput =document.getElementById("promoInput").value.trim();
            if(codeInput==="DISCOUNT5") {
                promoCode.textContent="-$5";
                totalPrice.textContent="$"+(orginalPrice-5);
                alert("Promo Code applied...");
            }
            else
            alert("Invalid Promo code...");
        }

        form.addEventListener('submit',validateForm)
            function validateForm(event) {
               event.preventDefault();
               
               const errFields=document.querySelectorAll(".text-danger");
               errFields.forEach(element => element.innerText="");
               let Valid=true;

            const fname=document.getElementById("fname").value.trim();
            if(fname===""){
                document.getElementById("err-fname").innerText="First name is required."
                Valid=false;
            }

            const lname=document.getElementById("lname").value.trim();
            if(lname===""){
                document.getElementById("err-lname").innerText="Last name is required."
                Valid=false;
            }

            const usrname=document.getElementById("usrname").value.trim();
            if(usrname===""){
                document.getElementById("err-usrname").innerText="User name is required."
                Valid=false;
            }

            const email=document.getElementById("email").value.trim();
            if(!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
                document.getElementById("err-email").innerText="Valid email is required"
                Valid=false;
            }

            const address=document.getElementById("address").value.trim();
            if(address===""){
                document.getElementById("err-address").innerText="Address is required"
                Valid=false;
            }

            const address2=document.getElementById("address").value.trim();
            if(address2===""){
                document.getElementById("err-address2").innerText="Address2 is required"
                Valid=false;
            }

            const zip=document.getElementById("zip").value.trim();
            if(!zip.match(/^\d{6}$/)){
                document.getElementById("err-zip").innerText="Valid 6-digit zip code is required"
                Valid=false;
            }

            const country=document.getElementById("country").value.trim();
            if(country==="Select the Country"){
                document.getElementById("err-country").innerText="Please select the country"
                Valid=false;
            }

            const state=document.getElementById("state").value.trim();
            if(state==="Select the State"){
                document.getElementById("err-state").innerText="Please select the State"
                Valid=false;
            }
            
            const cardName=document.getElementById("cardName").value.trim();
            if(cardName===""){
                document.getElementById("err-cardName").innerText="Name of cardholder is required"
                Valid=false;
            }

            const cardNumber=document.getElementById("cardNumber").value.trim();
            if(!cardNumber.match(/^\d{10,15}$/)){
                document.getElementById("err-cardNumber").innerText="Card number must be 10 to 15 digits"
                Valid=false;
            }

            const exp=document.getElementById("exp").value.trim();
            if(!exp.match(/^(0[1-9]|1[0-2])\/\d{2}$/)){
                document.getElementById("err-exp").innerText="Expiration must be in MM/YY format"
                Valid=false;
            }

            const cvv=document.getElementById("cvv").value.trim();
            if(!cvv.match(/^\d{3,4}$/)){
                document.getElementById("err-cvv").innerText="CVV must be 3 or 4 digits"
                Valid=false;
            }

            if(Valid){
                const payMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
                alert(`Form Submitted Successfully\n Payment method: ${payMethod}`);
                
            }

            }
            


    