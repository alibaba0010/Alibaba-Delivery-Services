import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";
import { restaurantModule } from "./restaurant.module";
import { json } from "express";
async function bootstrap() {
  const app =
    await NestFactory.create<NestExpressApplication>(restaurantModule);
  app.use(json({ limit: "15mb" }));
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.setBaseViewsDir(
    join(__dirname, "..", "apps/api-restuarants/email-templates")
  );
  app.setViewEngine("ejs");

  app.enableCors({
    origin: "*",
  });

  await app.listen(3002);
}
bootstrap();
