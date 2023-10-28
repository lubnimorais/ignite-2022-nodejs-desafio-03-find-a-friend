-- AddForeignKey
ALTER TABLE "PetImages" ADD CONSTRAINT "PetImages_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
