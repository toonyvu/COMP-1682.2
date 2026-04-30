import baked_ziti from "@/public/images/baked_ziti.jpg";
import beef_stroganoff from "@/public/images/beef_stroganoff.jpg";
import beef_tacos from "@/public/images/beef_tacos.jpeg";
import buttermilk_pancakes from "@/public/images/buttermilk_pancakes.jpeg";
import caesar_salad from "@/public/images/caesar_salad.jpeg";
import chicken_alfredo from "@/public/images/chicken_alfredo.jpg";
import chicken_curry from "@/public/images/chicken_curry.jpg";
import chicken_fried_rice from "@/public/images/chicken_fried_rice.jpeg";
import chicken_noodle_soup from "@/public/images/chicken_noodle_soup.jpg";
import chocolate_brownies from "@/public/images/chocolate_brownies.jpg";
import clam_chowder from "@/public/images/clam_chowder.jpg";
import egg_fried_rice from "@/public/images/egg_fried_rice.jpg";
import fish_and_chips from "@/public/images/fish_and_chips.jpg";
import french_toast from "@/public/images/french_toast.jpg";
import garlic_butter_shrimp from "@/public/images/garlic_butter_shrimp.jpg";
import grilled_salmon from "@/public/images/grilled_salmon.jpeg";
import kebabs from "@/public/images/kebabs.jpg";
import margeritta_pizza from "@/public/images/margeritta_pizza.jpeg";
import omelette from "@/public/images/omelette.jpg";
import pad_thai from "@/public/images/pad_thai.jpg";
import pesto_pasta from "@/public/images/pesto_pasta.jpg";
import ribs from "@/public/images/ribs.jpg";
import risotto from "@/public/images/risotto.jpg";
import spaghetti_bolognaise from "@/public/images/spaghetti_bolognaise.jpeg";
import stir_fry from "@/public/images/stir_fry.jpg";
import tomato_soup from "@/public/images/tomato_soup.jpeg";
import tuna_salad_sandwhich from "@/public/images/tuna_salad_sandwhich.jpg";
import vegetable_curry from "@/public/images/vegetable_curry.png";

import Image from "next/image";

type Props = {
  reverse?: boolean;
};

export default function ScrollItems({ reverse = false }: Props) {
  return (
    <div className="w-full inline-flex flex-nowrap overflow-hidden mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-200px),transparent_100%)]">
      <ul
        className="flex shrink-0 items-center gap-4 animate-infinite-scroll"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          animationDuration: reverse ? "80s" : "70s",
        }}
      >
        <li>
          <Image src={baked_ziti} alt="Baked Ziti" width={200} height={150} />
        </li>
        <li>
          <Image
            src={beef_stroganoff}
            alt="Beef Stroganoff"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image src={beef_tacos} alt="Beef Tacos" width={200} height={150} />
        </li>
        <li>
          <Image
            src={buttermilk_pancakes}
            alt="Buttermilk Pancakes"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={caesar_salad}
            alt="Caesar Salad"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={chicken_alfredo}
            alt="Chicken Alfredo"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={chicken_curry}
            alt="Chicken Curry"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={chicken_fried_rice}
            alt="Chicken Fried Rice"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={chicken_noodle_soup}
            alt="Chicken Noodle Soup"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={chocolate_brownies}
            alt="Chocolate Brownies"
            width={200}
            height={150}
          />
        </li>

        <li>
          <Image
            src={clam_chowder}
            alt="Clam Chowder"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={egg_fried_rice}
            alt="Egg Fried Rice"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={fish_and_chips}
            alt="Fish and Chips"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={french_toast}
            alt="French Toast"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={garlic_butter_shrimp}
            alt="Garlic Butter Shrimp"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={grilled_salmon}
            alt="Grilled Salmon"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image src={kebabs} alt="Kebabs" width={200} height={150} />
        </li>
        <li>
          <Image
            src={margeritta_pizza}
            alt="Margeritta Pizza"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image src={omelette} alt="Omelette" width={200} height={150} />
        </li>
        <li>
          <Image src={pad_thai} alt="Pad Thai" width={200} height={150} />
        </li>

        <li>
          <Image src={pesto_pasta} alt="Pesto Pasta" width={200} height={150} />
        </li>
        <li>
          <Image src={ribs} alt="Ribs" width={200} height={150} />
        </li>
        <li>
          <Image src={risotto} alt="Risotto" width={200} height={150} />
        </li>
        <li>
          <Image
            src={spaghetti_bolognaise}
            alt="Spaghetti Bolognaise"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image src={stir_fry} alt="Stir Fry" width={200} height={150} />
        </li>
        <li>
          <Image src={tomato_soup} alt="Tomato Soup" width={200} height={150} />
        </li>
        <li>
          <Image
            src={tuna_salad_sandwhich}
            alt="Tuna Salad Sandwhich"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={vegetable_curry}
            alt="Vegetable Curry"
            width={200}
            height={150}
          />
        </li>
      </ul>

      <ul
        className="flex shrink-0 items-center gap-4 animate-infinite-scroll"
        style={{
          animationDirection: reverse ? "reverse" : "normal",
          animationDuration: reverse ? "80s" : "70s",
        }}
        aria-hidden="true"
      >
        <li>
          <Image src={baked_ziti} alt="Baked Ziti" width={200} height={150} />
        </li>
        <li>
          <Image
            src={beef_stroganoff}
            alt="Beef Stroganoff"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image src={beef_tacos} alt="Beef Tacos" width={200} height={150} />
        </li>
        <li>
          <Image
            src={buttermilk_pancakes}
            alt="Buttermilk Pancakes"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={caesar_salad}
            alt="Caesar Salad"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={chicken_alfredo}
            alt="Chicken Alfredo"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={chicken_curry}
            alt="Chicken Curry"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={chicken_fried_rice}
            alt="Chicken Fried Rice"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={chicken_noodle_soup}
            alt="Chicken Noodle Soup"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={chocolate_brownies}
            alt="Chocolate Brownies"
            width={200}
            height={150}
          />
        </li>

        <li>
          <Image
            src={clam_chowder}
            alt="Clam Chowder"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={egg_fried_rice}
            alt="Egg Fried Rice"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={fish_and_chips}
            alt="Fish and Chips"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={french_toast}
            alt="French Toast"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={garlic_butter_shrimp}
            alt="Garlic Butter Shrimp"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={grilled_salmon}
            alt="Grilled Salmon"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image src={kebabs} alt="Kebabs" width={200} height={150} />
        </li>
        <li>
          <Image
            src={margeritta_pizza}
            alt="Margeritta Pizza"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image src={omelette} alt="Omelette" width={200} height={150} />
        </li>
        <li>
          <Image src={pad_thai} alt="Pad Thai" width={200} height={150} />
        </li>

        <li>
          <Image src={pesto_pasta} alt="Pesto Pasta" width={200} height={150} />
        </li>
        <li>
          <Image src={ribs} alt="Ribs" width={200} height={150} />
        </li>
        <li>
          <Image src={risotto} alt="Risotto" width={200} height={150} />
        </li>
        <li>
          <Image
            src={spaghetti_bolognaise}
            alt="Spaghetti Bolognaise"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image src={stir_fry} alt="Stir Fry" width={200} height={150} />
        </li>
        <li>
          <Image src={tomato_soup} alt="Tomato Soup" width={200} height={150} />
        </li>
        <li>
          <Image
            src={tuna_salad_sandwhich}
            alt="Tuna Salad Sandwhich"
            width={200}
            height={150}
          />
        </li>
        <li>
          <Image
            src={vegetable_curry}
            alt="Vegetable Curry"
            width={200}
            height={150}
          />
        </li>
      </ul>
    </div>
  );
}
