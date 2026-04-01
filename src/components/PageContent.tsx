interface PageContentProps {
  title: string;
  children: React.ReactNode;
}

function PageContent({ title, children }: PageContentProps) {
  return (
    <div className="text-center text-shadowcolor">
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;
