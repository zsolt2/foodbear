-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 25, 2022 at 04:19 PM
-- Server version: 8.0.28
-- PHP Version: 8.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `foodbear`
--

CREATE DATABASE IF NOT EXISTS `foodbear` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `foodbear`;

-- --------------------------------------------------------

--
-- Table structure for table `courier`
--

CREATE TABLE `courier` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `capacity` int NOT NULL,
  `isAvailable` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `courier`
--

INSERT INTO `courier` (`id`, `name`, `capacity`, `isAvailable`) VALUES
(1, 'Nagy Béla', 15, 0),
(2, 'Kiss Zoltán', 11, 0),
(47, 'Horváth Gabi', 12, 1);

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `price` int NOT NULL,
  `description` text COLLATE utf8_hungarian_ci NOT NULL,
  `imageUrl` text COLLATE utf8_hungarian_ci NOT NULL,
  `partnerId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`id`, `name`, `price`, `description`, `imageUrl`, `partnerId`) VALUES
(1, 'Provençal Omelette Cake', 92, 'Break the eggs into two bowls, five in each. Whisk lightly and season with salt and pepper. Heat the oil in a pan, add the courgettes and spring onions, then fry gently for about 10 mins until softened. Cool, then stir into one bowl of eggs with a little salt and pepper. Add the roasted peppers to the other bowl of eggs with the garlic, chilli, salt and pepper.\r\nHeat a little oil in a 20-23cm frying pan, preferably non-stick. Pour the eggs with courgette into a measuring jug, then pourabout one-third of the mixture into the pan, swirling it to cover the base of the pan. Cook until the egg is set and lightly browned underneath, then cover the pan with a plate and invert the omelette onto it. Slide it back into the pan to cook the other side. Repeat with the remaining mix to make two more omelettes, adding a little oil to the pan each time. Stack the omelettes onto a plate. Make three omelettes in the same way with the red pepper mixture, then stack them on a separate plate.\r\nNow make the filling. Beat the cheese to soften it, then beat in the milk to make a spreadable consistency. Stir in the herbs, salt and pepper. Line a deep, 20-23cm round cake tin with cling film (use a tin the same size as the frying pan). Select the best red pepper omelette and place in the tin, prettiest side down. Spread with a thin layer of cheese filling, then cover with a courgette omelette. Repeat, alternating the layers, until all the omelettes and filling are in the tin, finishing with an omelette. Flip the cling film over the omelette, then chill for up to 24 hrs.\r\nTo serve, invert the omelette cake onto a serving plate and peel off the cling film. Pile rocket on the top and scatter over the cheese, a drizzle of olive oil and a little freshly ground black pepper. Serve cut into wedges.', 'https://www.themealdb.com/images/media/meals/qwtrtp1511799242.jpg', 66),
(2, 'Beef Bourguignon', 79, 'Heat a large casserole pan and add 1 tbsp goose fat. Season the beef and fry until golden brown, about 3-5 mins, then turn over and fry the other side until the meat is browned all over, adding more fat if necessary. Do this in 2-3 batches, transferring the meat to a colander set over a bowl when browned.\r\nIn the same pan, fry the bacon, shallots or pearl onions, mushrooms, garlic and bouquet garni until lightly browned. Mix in the tomato purée and cook for a few mins, stirring into the mixture. This enriches the bourguignon and makes a great base for the stew. Then return the beef and any drained juices to the pan and stir through.\r\nPour over the wine and about 100ml water so the meat bobs up from the liquid, but isn’t completely covered. Bring to the boil and use a spoon to scrape the caramelised cooking juices from the bottom of the pan – this will give the stew more flavour.\r\nHeat oven to 150C/fan 130C/gas 2. Make a cartouche: tear off a square of foil slightly larger than the casserole, arrange it in the pan so it covers the top of the stew and trim away any excess foil. Then cook for 3 hrs. If the sauce looks watery, remove the beef and veg with a slotted spoon, and set aside. Cook the sauce over a high heat for a few mins until the sauce has thickened a little, then return the beef and vegetables to the pan.\r\nTo make the celeriac mash, peel the celeriac and cut into cubes. Heat the olive oil in a large frying pan. Tip in the celeriac and fry for 5 mins until it turns golden. Season well with salt and pepper. Stir in the rosemary, thyme, bay and cardamom pods, then pour over 200ml water, enough to nearly cover the celeriac. Turn the heat to low, partially cover the pan and leave to simmer for 25-30 mins.\r\nAfter 25-30 mins, the celeriac should be soft and most of the water will have evaporated. Drain away any remaining water, then remove the herb sprigs, bay and cardamom pods. Lightly crush with a potato masher, then finish with a glug of olive oil and season to taste. Spoon the beef bourguignon into serving bowls and place a large spoonful of the celeriac mash on top. Garnish with one of the bay leaves, if you like.', 'https://www.themealdb.com/images/media/meals/vtqxtu1511784197.jpg', 65),
(3, 'Matar Paneer', 18, 'Heat the oil in a frying pan over high heat until it’s shimmering hot. Add the paneer, then turn the heat down a little. Fry until it starts to brown at the edges, then turn it over and brown on each side – the paneer will brown faster than you think, so don’t walk away. Remove the paneer from the pan and drain on kitchen paper.\r\nPut the ginger, cumin, turmeric, ground coriander and chilli in the pan, and fry everything for 1 min. Add the tomatoes, mashing them with the back of a spoon and simmer everything for 5 mins until the sauce smells fragrant. Add a splash of water if it’s too thick. Season well. Add the peas and simmer for a further 2 mins, then stir in the paneer and sprinkle over the garam masala. Divide between two bowls, top with coriander leaves and serve with naan bread, roti or rice.', 'https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg', 69),
(4, 'Tunisian Orange Cake', 27, 'Preheat oven to 190 C / Gas 5. Grease a 23cm round springform tin.\r\nCut off the hard bits from the top and bottom of the orange. Slice the orange and remove all seeds. Puree the orange with its peel in a food processor. Add one third of the sugar and the olive oil and continue to mix until well combined.\r\nSieve together flour and baking powder.\r\nBeat the eggs and the remaining sugar with an electric hand mixer for at least five minutes until very fluffy. Fold in half of the flour mixture, then the orange and the vanilla, then fold in the remaining flour. Mix well but not for too long.\r\nPour cake mixture into prepared tin and smooth out. Bake in preheated oven for 20 minutes. Reduce the oven temperature to 160 C / Gas 2 and bake again for 30 minutes Bake until the cake is golden brown and a skewer comes out clean. Cool on a wire cake rack.', 'https://www.themealdb.com/images/media/meals/y4jpgq1560459207.jpg', 65),
(5, 'New York cheesecake', 51, 'Position an oven shelf in the middle of the oven. Preheat the oven to fan 160C/conventional 180C/gas 4. Line the base of a 23cm springform cake tin with parchment paper. For the crust, melt the butter in a medium pan. Stir in the biscuit crumbs and sugar so the mixture is evenly moistened. Press the mixture into the bottom of the pan and bake for 10 minutes. Cool on a wire rack while preparing the filling.\r\nFor the filling, increase the oven temperature to fan 200C/conventional 240C/gas 9. In a table top mixer fitted with the paddle attachment, beat the soft cheese at medium-low speed until creamy, about 2 minutes. With the mixer on low, gradually add the sugar, then the flour and a pinch of salt, scraping down the sides of the bowl and the paddle twice.\r\nSwap the paddle attachment for the whisk. Continue by adding the vanilla, lemon zest and juice. Whisk in the eggs and yolk, one at a time, scraping the bowl and whisk at least twice. Stir the 284ml carton of soured cream until smooth, then measure 200ml/7fl oz (just over 3⁄4 of the carton). Continue on low speed as you add the measured soured cream (reserve the rest). Whisk to blend, but don\'t over-beat. The batter should be smooth, light and somewhat airy.\r\nBrush the sides of the springform tin with melted butter and put on a baking sheet. Pour in the filling - if there are any lumps, sink them using a knife - the top should be as smooth as possible. Bake for 10 minutes. Reduce oven temperature to fan 90C/conventional 110C/gas 1⁄4 and bake for 25 minutes more. If you gently shake the tin, the filling should have a slight wobble. Turn off the oven and open the oven door for a cheesecake that\'s creamy in the centre, or leave it closed if you prefer a drier texture. Let cool in the oven for 2 hours. The cheesecake may get a slight crack on top as it cools.\r\nCombine the reserved soured cream with the 142ml carton, the sugar and lemon juice for the topping. Spread over the cheesecake right to the edges. Cover loosely with foil and refrigerate for at least 8 hours or overnight.\r\nRun a round-bladed knife around the sides of the tin to loosen any stuck edges. Unlock the side, slide the cheesecake off the bottom of the tin onto a plate, then slide the parchment paper out from underneath.', 'https://www.themealdb.com/images/media/meals/swttys1511385853.jpg', 66),
(6, 'Corba', 54, 'Pick through your lentils for any foreign debris, rinse them 2 or 3 times, drain, and set aside.  Fair warning, this will probably turn your lentils into a solid block that you’ll have to break up later\r\nIn a large pot over medium-high heat, sauté the olive oil and the onion with a pinch of salt for about 3 minutes, then add the carrots and cook for another 3 minutes.\r\nAdd the tomato paste and stir it around for around 1 minute. Now add the cumin, paprika, mint, thyme, black pepper, and red pepper as quickly as you can and stir for 10 seconds to bloom the spices. Congratulate yourself on how amazing your house now smells.\r\nImmediately add the lentils, water, broth, and salt. Bring the soup to a (gentle) boil.\r\nAfter it has come to a boil, reduce heat to medium-low, cover the pot halfway, and cook for 15-20 minutes or until the lentils have fallen apart and the carrots are completely cooked.\r\nAfter the soup has cooked and the lentils are tender, blend the soup either in a blender or simply use a hand blender to reach the consistency you desire. Taste for seasoning and add more salt if necessary.\r\nServe with crushed-up crackers, torn up bread, or something else to add some extra thickness.  You could also use a traditional thickener (like cornstarch or flour), but I prefer to add crackers for some texture and saltiness.  Makes great leftovers, stays good in the fridge for about a week.', 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg', 65),
(7, 'Parkin Cake', 69, 'Heat oven to 160C/140C fan/gas 3. Grease a deep 22cm/9in square cake tin and line with baking parchment. Beat the egg and milk together with a fork.\r\n\r\nGently melt the syrup, treacle, sugar and butter together in a large pan until the sugar has dissolved. Remove from the heat. Mix together the oatmeal, flour and ginger and stir into the syrup mixture, followed by the egg and milk.\r\n\r\nPour the mixture into the tin and bake for 50 mins - 1 hr until the cake feels firm and a little crusty on top. Cool in the tin then wrap in more parchment and foil and keep for 3-5 days before eating if you can – it’ll become softer and stickier the longer you leave it, up to 2 weeks.\r\n', 'https://www.themealdb.com/images/media/meals/qxuqtt1511724269.jpg', 65),
(8, 'Soy-Glazed Meatloaves with Wasabi Mashed Potatoes & Roasted Carrots', 79, '1. Preheat oven to 425 degrees. Wash and dry all produce. Dice potatoes into 1/2-inch pieces. Trim, peel, and cut carrots on a diagonal into 1/2-inch-thick pieces. Trim and thinly slice scallions, separating whites from greens; finely chop whites. Peel and finely chop garlic.\r\n\r\n2. In a medium bowl, soak bread with 2 TBSP water (4 TBSP for 4 servings); break up with your hands until pasty. Stir in beef, sriracha, scallion whites, half the garlic, salt (we used 3/4 tsp kosher salt; 11/2 tsp for 4), and pepper. Form into two 1-inch-tall loaves (four loaves for 4). Place on one side of a baking sheet. Toss carrots on empty side of same sheet with a drizzle of oil, salt, and pepper. (For 4, spread meatloaves out across whole sheet and add carrots to a second sheet.) Bake for 20 minutes (we\'ll glaze the meatloaves then).\r\n\r\n3. Meanwhile, place potatoes in a medium pot with enough salted water to cover by 2 inches. Bring to a boil and cook until very\r\ntender, 12-15 minutes. Reserve 1/2 cup potato cooking liquid, then drain. While potatoes cook, in a small bowl, combine soy sauce, garlic powder, 1/4 cup ketchup (1/2 cup for 4 servings), and 2 tsp sugar (4 tsp for 4).\r\n\r\n4. Once meatloaves and carrots have baked 20 minutes, remove from oven. Spoon half the ketchup glaze over meatloaves (save\r\nthe rest for serving); return to oven until carrots are browned and tender, meatloaves are cooked through, and glaze is tacky, 4-5 minutes more.\r\n\r\n5. Meanwhile, melt 2 TBSP butter (4 TBSP for 4 servings) in pot used for potatoes over medium heat. Add remaining garlic and cook\r\nuntil fragrant, 30 seconds. Add potatoes and 1/4 tsp wasabi. Mash, adding splashes of reserved potato cooking liquid as necessary until smooth. Season with salt and pepper. (If you like things spicy, stir in more wasabi!)\r\n\r\n6. Divide meatloaves, mashed potatoes, and roasted carrots between plates. Sprinkle with scallion greens and serve with remaining ketchup glaze on the side for dipping.', 'https://www.themealdb.com/images/media/meals/o2wb6p1581005243.jpg', 66),
(9, 'Mince Pies', 29, 'To make the pastry, rub 225g cold, diced butter into 350g plain flour, then mix in 100g golden caster sugar and a pinch of salt.\r\n\r\nCombine the pastry into a ball – don’t add liquid – and knead it briefly. The dough will be fairly firm, like shortbread dough. You can use the dough immediately, or chill for later.\r\n\r\nPreheat the oven to 200C/gas 6/fan 180C. Line 18 holes of two 12-hole patty tins, by pressing small walnut-sized balls of pastry into each hole.\r\n\r\nSpoon 280g mincemeat into the pies.\r\n\r\nTake slightly smaller balls of pastry than before and pat them out between your hands to make round lids, big enough to cover the pies. \r\n\r\nTop the pies with their lids, pressing the edges gently together to seal – you don’t need to seal them with milk or egg as they will stick on their own. (The pies may now be frozen for up to 1 month).\r\n\r\nBeat 1 small egg and brush the tops of the pies. Bake for 20 mins until golden. Leave to cool in the tin for 5 mins, then remove to a wire rack.\r\n\r\nTo serve, lightly dust with icing sugar.', 'https://www.themealdb.com/images/media/meals/qe8pf51576795532.jpg', 67),
(10, 'Key Lime Pie', 87, 'Heat the oven to 160C/fan 140C/gas 3. Whizz the biscuits to crumbs in a food processor (or put in a strong plastic bag and bash with a rolling pin). Mix with the melted butter and press into the base and up the sides of a 22cm loose-based tart tin. Bake in the oven for 10 minutes. Remove and cool.\r\nPut the egg yolks in a large bowl and whisk for a minute with electric beaters. Add the condensed milk and whisk for 3 minutes then add the zest and juice and whisk again for 3 minutes. Pour the filling into the cooled base then put back in the oven for 15 minutes. Cool then chill for at least 3 hours or overnight if you like.\r\nWhen you are ready to serve, carefully remove the pie from the tin and put on a serving plate. To decorate, softly whip together the cream and icing sugar. Dollop or pipe the cream onto the top of the pie and finish with extra lime zest.', 'https://www.themealdb.com/images/media/meals/qpqtuu1511386216.jpg', 69),
(11, 'Cashew Ghoriba Biscuits', 39, 'Preheat the oven at 180 C / Gas 4. Line a baking tray with greaseproof paper.\r\nIn a bowl, mix the cashews and icing sugar. Add the egg yolks and orange blossom water and mix to a smooth homogeneous paste.\r\nTake lumps of the cashew paste and shape into small balls. Roll the balls in icing sugar and transfer to the baking tray. Push an almond in the centre of each ghribia.\r\nBake until the biscuits are lightly golden, about 20 minutes. Keep an eye on them, they burn quickly.', 'https://www.themealdb.com/images/media/meals/t3r3ka1560461972.jpg', 67),
(12, 'Strawberry Rhubarb Pie', 20, 'Pie Crust:  In a food processor, place the flour, salt, and sugar and process until combined. Add the butter and process until the mixture resembles coarse\r\n\r\nmeal (about 15 seconds). Pour 1/4 cup (60 ml) water in a slow, steady stream, through the feed tube until the dough just holds together when pinched. If necessary, add more water. Do not process more than 30 seconds.\r\nTurn the dough onto your work surface and gather into a ball. Divide the dough in half, flattening each half into a disk, cover with plastic wrap, and refrigerate for about one hour before using. This will chill the butter and relax the gluten in the flour. \r\n\r\nAfter the dough has chilled sufficiently, remove one portion of the dough from the fridge and place it on a lightly floured surface.  Roll the pastry into a 12 inch (30 cm) circle. (To prevent the pastry from sticking to the counter and to ensure uniform thickness, keep lifting up and turning the pastry a quarter turn as you roll (always roll from the center of the pastry outwards).)  Fold the dough in half and gently transfer to a 9 inch (23 cm) pie pan. Brush off any excess flour and trim any overhanging pastry to an edge of 1/2 inch (1.5 cm). Refrigerate the pastry, covered with plastic wrap, while you make the filling. \r\n\r\nRemove the second round of pastry and roll it into a 13 inch (30 cm) circle. Using a pastry wheel or pizza cutter, cut the pastry into about 3/4 inch (2 cm) strips. Place the strips of pastry on a parchment paper-lined baking sheet, cover with plastic wrap, and place in the refrigerator for about 10 minutes. \r\n\r\nMake the Strawberry Rhubarb Filling: Place the cut strawberries and rhubarb in a large bowl. In a small bowl mix together the cornstarch, sugar, and ground cinnamon. \r\n\r\nRemove the chilled pie crust from the fridge. Sprinkle about 2 tablespoons of the sugar mixture over the bottom of the pastry crust. Add the remaining sugar mixture to the strawberries and rhubarb and gently toss to combine. Pour the fruit mixture into the prepared pie shell. Sprinkle the fruit with about 1 teaspoon of lemon juice and dot with 2 tablespoons of butter.\r\n\r\nRemove the lattice pastry from the refrigerator and, starting at the center with the longest strips and working outwards, place half the strips, spacing about 1 inch (2.5 cm) apart, on top of the filling. (Use the shortest pastry strips at the outer edges.) Then, gently fold back, about halfway, every other strip of pastry. Take another strip of pastry and place it perpendicular on top of the first strips of pastry. Unfold the bottom strips of pastry and then fold back the strips that weren\'t folded back the first time. Lay another strip of pastry perpendicular on top of the filling and then continue with the remaining strips. Trim the edges of the pastry strips, leaving a 1 inch (2.5 cm) overhang. Seal the edges of the pastry strips by folding them under the bottom pastry crust and flute the edges of the pastry. Brush the lattice pastry with milk and sprinkle with a little sugar. Cover and place in the refrigerator while you preheat the oven to 400 degrees F (205 degrees C) and place the oven rack in the lower third of the oven. Put a baking sheet, lined with aluminum foil, on the oven rack (to catch any spills.)\r\n\r\nPlace the pie plate on the hot baking sheet and bake the pie for about 35 minutes and then, if the edges of the pie are browning too much, cover with a foil ring. Continue to bake the pie for about another 10 minutes or until the crust is a golden brown color and the fruit juices begin to bubble.\r\n\r\nRemove the pie from the oven and place on a wire rack to cool for several hours. Serve at room temperature with softly whipped cream or vanilla ice cream. Leftovers can be stored in the refrigerator for about 3 days. Reheat before serving. This pie can be frozen.\r\n\r\nMakes one 9 inch (23 cm) pie.', 'https://www.themealdb.com/images/media/meals/178z5o1585514569.jpg', 66),
(13, 'Katsu Chicken curry', 69, 'Prep:15min  ›  Cook:30min  ›  Ready in:45min \r\n\r\nFor the curry sauce: Heat oil in medium non-stick saucepan, add onion and garlic and cook until softened. Stir in carrots and cook over low heat for 10 to 12 minutes.\r\nAdd flour and curry powder; cook for 1 minute. Gradually stir in stock until combined; add honey, soy sauce and bay leaf. Slowly bring to the boil.\r\nTurn down heat and simmer for 20 minutes or until sauce thickens but is still of pouring consistency. Stir in garam masala. Pour the curry sauce through a sieve; return to saucepan and keep on low heat until ready to serve.\r\nFor the chicken: Season both sides of chicken breasts with salt and pepper. Place flour, egg and breadcrumbs in separate bowls and arrange in a row. Coat the chicken breasts in flour, then dip them into the egg, then coat in breadcrumbs, making sure you cover both sides.\r\nHeat oil in large frying pan over medium-high heat. Place chicken into hot oil and cook until golden brown, about 3 or 4 minutes each side. Once cooked, place on kitchen paper to absorb excess oil.\r\nPour curry sauce over chicken, serve with white rice and enjoy!', 'https://www.themealdb.com/images/media/meals/vwrpps1503068729.jpg', 65),
(14, 'Three Fish Pie', 41, 'Preheat the oven to 200C/400F/Gas 6 (180C fan).\r\nPut the potatoes into a saucepan of cold salted water. Bring up to the boil and simmer until completely tender. Drain well and then mash with the butter and milk. Add pepper and taste to check the seasoning. Add salt and more pepper if necessary.\r\nFor the fish filling, melt the butter in a saucepan, add the leeks and stir over the heat. Cover with a lid and simmer gently for 10 minutes, or until soft. Measure the flour into a small bowl. Add the wine and whisk together until smooth.\r\nAdd the milk to the leeks, bring to the boil and then add the wine mixture. Stir briskly until thickened. Season and add the parsley and fish. Stir over the heat for two minutes, then spoon into an ovenproof casserole. Scatter over the eggs. Allow to cool until firm.\r\nSpoon the mashed potatoes over the fish mixture and mark with a fork. Sprinkle with cheese.\r\nBake for 30-40 minutes, or until lightly golden-brown on top and bubbling around the edges.', 'https://www.themealdb.com/images/media/meals/spswqs1511558697.jpg', 69),
(15, 'Carrot Cake', 61, 'For the carrot cake, preheat the oven to 160C/325F/Gas 3. Grease and line a 26cm/10in springform cake tin.\r\nMix all of the ingredients for the carrot cake, except the carrots and walnuts, together in a bowl until well combined. Stir in the carrots and walnuts.\r\nSpoon the mixture into the cake tin and bake for 1 hour 15 minutes, or until a skewer inserted into the middle comes out clean. Remove the cake from the oven and set aside to cool for 10 minutes, then carefully remove the cake from the tin and set aside to cool completely on a cooling rack.\r\nMeanwhile, for the icing, beat the cream cheese, caster sugar and butter together in a bowl until fluffy. Spread the icing over the top of the cake with a palette knife.', 'https://www.themealdb.com/images/media/meals/vrspxv1511722107.jpg', 67),
(16, 'Three Fish Pie', 36, 'Preheat the oven to 200C/400F/Gas 6 (180C fan).\r\nPut the potatoes into a saucepan of cold salted water. Bring up to the boil and simmer until completely tender. Drain well and then mash with the butter and milk. Add pepper and taste to check the seasoning. Add salt and more pepper if necessary.\r\nFor the fish filling, melt the butter in a saucepan, add the leeks and stir over the heat. Cover with a lid and simmer gently for 10 minutes, or until soft. Measure the flour into a small bowl. Add the wine and whisk together until smooth.\r\nAdd the milk to the leeks, bring to the boil and then add the wine mixture. Stir briskly until thickened. Season and add the parsley and fish. Stir over the heat for two minutes, then spoon into an ovenproof casserole. Scatter over the eggs. Allow to cool until firm.\r\nSpoon the mashed potatoes over the fish mixture and mark with a fork. Sprinkle with cheese.\r\nBake for 30-40 minutes, or until lightly golden-brown on top and bubbling around the edges.', 'https://www.themealdb.com/images/media/meals/spswqs1511558697.jpg', 66),
(17, 'Seri muka kuih', 61, 'Soak glutinous rice with water for at least 1 ½ hours prior to using. Drain.\r\nPrepare a 9-inch round or square cake pan and spray with cooking spray or line with plastic wrap.\r\nMix coconut milk, water, salt and the rice. Pour it into cake pan, topped with the pandan knots.\r\nSteam for 30 minutes.\r\nAfter 30 minutes, fluff up the rice and remove pandan knots. Then, using a greased spatula, flatten the steamed rice. Make sure there are no holes/air bubbles and gaps in the rice, especially the sides.\r\nSteam for another 10 minutes.\r\n\r\nCombine pandan juice, coconut milk, all purpose flour, cornflour, and sugar. Mix well.\r\nAdd eggs and whisk well then strain into a medium sized metal bowl or pot.\r\nPlace pandan mixture over simmering water (double boiler or bain-marie)\r\nStir continuously and cook till custard starts to thicken. (15 minutes)\r\nPour pandan custard into glutinous rice layer, give it a little tap (for air bubbles) and continue to steam for 30 minutes.\r\nRemove kuih seri muka from the steamer and allow to cool completely before cutting into rectangles or diamond shapes.', 'https://www.themealdb.com/images/media/meals/6ut2og1619790195.jpg', 65),
(18, 'Full English Breakfast', 13, 'Heat the flat grill plate over a low heat, on top of 2 rings/flames if it fits, and brush sparingly with light olive oil.\r\nCook the sausages first. Add the sausages to the hot grill plate/the coolest part if there is one and allow to cook slowly for about 15-20 minutes, turning occasionally, until golden. After the first 10 minutes, increase the heat to medium before beginning to cook the other ingredients. If you are struggling for space, completely cook the sausages and keep hot on a plate in the oven.\r\nSnip a few small cuts into the fatty edge of the bacon. Place the bacon straight on to the grill plate and fry for 2-4 minutes each side or until your preferred crispiness is reached. Like the sausages, the cooked bacon can be kept hot on a plate in the oven.\r\nFor the mushrooms, brush away any dirt using a pastry brush and trim the stalk level with the mushroom top. Season with salt and pepper and drizzle over a little olive oil. Place stalk-side up on the grill plate and cook for 1-2 minutes before turning and cooking for a further 3-4 minutes. Avoid moving the mushrooms too much while cooking, as this releases the natural juices, making them soggy.\r\nFor the tomatoes, cut the tomatoes across the centre/or in half lengthways if using plum tomatoes , and with a small, sharp knife remove the green \'eye\'. Season with salt and pepper and drizzle with a little olive oil. Place cut-side down on the grill plate and cook without moving for 2 minutes. Gently turn over and season again. Cook for a further 2-3 minutes until tender but still holding their shape.\r\nFor the black pudding, cut the black pudding into 3-4 slices and remove the skin. Place on the grill plate and cook for 1½-2 minutes each side until slightly crispy.\r\nFor \'proper\' fried bread it\'s best to cook it in a separate pan. Ideally, use bread that is a couple of days old. Heat a frying pan to a medium heat and cover the base with oil. Add the bread and cook for 2-3 minutes each side until crispy and golden. If the pan becomes too dry, add a little more oil. For a richer flavour, add a knob of butter after you turn the slice.\r\nFor the fried eggs, break the egg straight into the pan with the fried bread and leave for 30 seconds. Add a good knob of butter and lightly splash/baste the egg with the butter when melted. Cook to your preferred stage, season and gently remove with a fish slice.\r\nOnce all the ingredients are cooked, serve on warm plates and enjoy straight away with a good squeeze of tomato ketchup or brown sauce.', 'https://www.themealdb.com/images/media/meals/sqrtwu1511721265.jpg', 65),
(19, 'Egyptian Fatteh', 51, 'To prepare bread for bottom of dish: Take pita bread and rip into bite size pieces. In a frying pan, add about a 1/4 stick of butter, add bread pieces and fry until golden brown and crisp. Put these pieces in a glass baking dish, preferably a square sized dish. Set aside.\r\nThen add to same pan, a little more butter, salt, approximately 2 cloves of crushed fresh garlic, and a teaspoon or so of cumin stir around a bit until you can smell aroma, then add fried bread pieces to this mixture, stir to coat bread and put back into glass baking dish. Set aside.\r\nTo prepare meat: put some butter in a pot, stir fry meat until brown, add 1 onion quartered, salt & pepper, 1 cube of chicken bouillon and water to cover meat. Bring to a boil, turn down to simmer, cover and cook until tender, approximately 2 hours. After meat has cooled, take out chunks of meat and put in a bowl, set aside. Reserve soup from the meat separately.\r\nTo prepare the rice: Put some butter into a pot, add shareya (fideo noodles) like a handful or so, keep stirring until golden brown, not too dark, but very golden. Then add two cups of rice, stir a little bit until some of the rice turns an opaque white. Add 2-1/4 cups of water and salt to taste. Bring to a boil, cover and turn down to simmer, cook until tender. Test the rice tenderness after about 35 minutes.\r\nNow take some of the soup from meat and add to the top of the bread pieces in baking dish to saturate.Add cooked rice on top of bread pieces. Slowly spoon remainder of soup onto rice, looking at glass dish sides to see level of soup, should reach just to top of rice, don’t worry, this doesn’t have to be exact. Now you’re ready to make the sauce and fry the meat to put on top.\r\nTo prepare red sauce: In a pan, add a little oil or butter, crushed tomato, a half teaspoon of tomato paste, salt & pepper, 2 cloves of fresh crushed garlic and cumin. Add also approximately 3 tablespoons of vinegar, stir this until you smell aroma and it is a bit smooth. It should be a bit thick, not watery, but if too thick you can add a bit of water. Spread with a wooden spoon atop the rice to cover.\r\nTo fry meat: In a pan add a bit of butter or oil, the meat, just a touch of tomato paste, about a tablespoon of fresh crushed garlic, salt & pepper, a teaspoon of cumin. Cook until meat is golden fried.\r\nSpoon this atop the rice and serve. Enjoy!', 'https://www.themealdb.com/images/media/meals/rlwcc51598734603.jpg', 69),
(20, 'Crock Pot Chicken Baked Tacos', 15, 'Put the uncooked chicken breasts in the crock pot. Pour the full bottle of salad dressing over the chicken. Sprinkle the rest of the ingredients over the top and mix them in a bit with a spoon.\r\nCover your crock pot with the lid and cook on high for 4 hours.\r\nRemove all the chicken breasts from the crock pot and let cool.\r\nShred the chicken breasts and move to a glass bowl.\r\nPour most of the liquid over the shredded chicken.\r\nFOR THE TACOS:\r\nMake the guacamole sauce by mixing the avocado and green salsa together. Pour the guacamole mixture through a strainer until smooth and transfer to a squeeze bottle. Cut the tip off the lid of the squeeze bottle to make the opening more wide if needed.\r\nMake the sour cream sauce by mixing the sour cream and milk together until you get a more liquid sour cream sauce. Transfer to a squeeze bottle.\r\nIn a 9x 13 glass baking dish, fill all 12+ tacos with a layer of refried beans, cooked chicken and shredded cheese.\r\nBake at 450 for 10-15 minutes just until the cheese is melted and bubbling.\r\nOut of the oven top all the tacos with the sliced grape tomaotes, jalapeno and cilantro.\r\nFinish with a drizzle of guacamole and sour cream.\r\nEnjoy!', 'https://www.themealdb.com/images/media/meals/ypxvwv1505333929.jpg', 67),
(21, 'Tarte Tatin', 11, 'Roll the pastry to a 3mm-thick round on a lightly floured surface and cut a 24cm circle, using a plate as a guide. Lightly prick all over with a fork, wrap in cling film on a baking sheet and freeze while preparing the apples.\r\nHeat oven to 180C/160C fan/gas 4. Peel, quarter and core the apples. Put the sugar in a flameproof 20cm ceramic Tatin dish or a 20cm ovenproof heavy-based frying pan and place over a medium-high heat. Cook the sugar for 5-7 mins to a dark amber caramel syrup that’s starting to smoke, then turn off the heat and stir in the 60g diced chilled butter.\r\nTo assemble the Tarte Tatin, arrange the apple quarters very tightly in a circle around the edge of the dish first, rounded-side down, then fill in the middle in a similar fashion. Gently press with your hands to ensure there are no gaps. Brush the fruit with the melted butter.\r\nBake in the oven for 30 mins, then remove and place the disc of frozen puff pastry on top – it will quickly defrost. Tuck the edges down the inside of the dish and, with a knife, prick a few holes in the pastry to allow steam to escape. Bake for a further 40-45 mins until the pastry is golden brown and crisp.\r\nAllow to cool to room temperature for 1 hr before running a knife around the edge of the dish and inverting it onto a large serving plate that is deep enough to contain the juices. Serve with crème fraîche or vanilla ice cream.', 'https://www.themealdb.com/images/media/meals/ryspuw1511786688.jpg', 66),
(37, 'Pizza', 100, 'Very long description', 'https://cdn-icons-png.flaticon.com/512/44/44289.png', 68);

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int NOT NULL,
  `courierId` int DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `note` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `orderTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `deliveryTime` datetime DEFAULT NULL,
  `delivered` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `courierId`, `address`, `note`, `name`, `orderTime`, `deliveryTime`, `delivered`) VALUES
(25, 1, 'Address 2', '', 'costumer 2', '2022-04-25 13:59:45.263000', '2022-04-25 17:42:27', 1),
(27, 1, 'Address 2', '', 'Customer 2', '2022-04-25 17:43:48.121000', NULL, 0),
(28, 2, 'Address 3', '', 'Customer 3', '2022-04-25 17:57:34.520000', NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `order_to_food`
--

CREATE TABLE `order_to_food` (
  `id` int NOT NULL,
  `amount` int NOT NULL,
  `orderId` int DEFAULT NULL,
  `foodId` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `order_to_food`
--

INSERT INTO `order_to_food` (`id`, `amount`, `orderId`, `foodId`) VALUES
(33, 2, 25, 8),
(34, 1, 25, 16),
(35, 1, 25, 21),
(38, 1, 27, 12),
(39, 1, 27, 16),
(40, 1, 27, 21),
(41, 2, 28, 9),
(42, 2, 28, 11),
(43, 1, 28, 15);

-- --------------------------------------------------------

--
-- Table structure for table `partner`
--

CREATE TABLE `partner` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `tel` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `address` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `taxNumber` varchar(255) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `partner`
--

INSERT INTO `partner` (`id`, `name`, `tel`, `address`, `taxNumber`) VALUES
(65, 'Bistro', '0362598879', 'Miskolc, 3500, Arany János tér', '63454984651'),
(66, 'Mexican Restaurant', '5346841513131', 'Budapest, Petőfi Utca 36', '17899611795'),
(67, 'Italian Restaurant', '1635498414', 'Miskolc, Egyetemváros', '87894564131'),
(68, 'Pizzeria Blaha', '1635498414', 'Budapest', '78945134749'),
(69, 'Honk Kong Restaurant', '1635498414', 'Miskolc', '78897945617');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `isAdmin` tinyint NOT NULL,
  `password` varchar(255) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_hungarian_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `isAdmin`, `password`) VALUES
(7, 'Admin 2', 'admin@foodbear.com', '1', '$2b$10$dQ990LlBob2JxPkW2cLueOqgGPvKb4u1izXXE/4.1RAKnLVjOa/u6'),
(59, 'Non Admin', 'nonAdminUser@foodbear.com', 0, '$2b$10$oCP7h.UwZnTXgEyfYIzmVuz7yDkTSaiXayOkHVdg7fzQF0cd6HHH2'),
(58, 'Power User', 'user@foodbear.com', 1, '$2b$10$/vAzbj6SUVAj54UsUbm8bugSyxTR4fFCmJFk.6w.j3AfIUvdySLwq');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courier`
--
ALTER TABLE `courier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_2e87661eebb1285315122681701` (`partnerId`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_09a8dc00d5ffead302306720bc1` (`courierId`);

--
-- Indexes for table `order_to_food`
--
ALTER TABLE `order_to_food`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_9fe406457f64148f76ba16eecc2` (`orderId`),
  ADD KEY `FK_e1e9c66c26379ef107ac0c8ebe4` (`foodId`);

--
-- Indexes for table `partner`
--
ALTER TABLE `partner`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_9af6a8bd7cac55b61babc75385` (`name`),
  ADD UNIQUE KEY `IDX_1318e7e1c0ff650ca38889f61c` (`taxNumber`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_065d4d8f3b5adb4a08841eae3c` (`name`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courier`
--
ALTER TABLE `courier`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `order_to_food`
--
ALTER TABLE `order_to_food`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `partner`
--
ALTER TABLE `partner`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `food`
--
ALTER TABLE `food`
  ADD CONSTRAINT `FK_2e87661eebb1285315122681701` FOREIGN KEY (`partnerId`) REFERENCES `partner` (`id`);

--
-- Constraints for table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `FK_09a8dc00d5ffead302306720bc1` FOREIGN KEY (`courierId`) REFERENCES `courier` (`id`);

--
-- Constraints for table `order_to_food`
--
ALTER TABLE `order_to_food`
  ADD CONSTRAINT `FK_9fe406457f64148f76ba16eecc2` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`),
  ADD CONSTRAINT `FK_e1e9c66c26379ef107ac0c8ebe4` FOREIGN KEY (`foodId`) REFERENCES `food` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
